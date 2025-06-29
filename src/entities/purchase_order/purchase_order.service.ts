import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePurchaseOrderDto } from './dto/create-purchase_order.dto';
import { UpdatePurchaseOrderDto } from './dto/update-purchase_order.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponsePurchaseOrderDto } from './dto/response-purchase_order.dto';
import { CreateVoucherDto } from '../voucher/dto/create-voucher.dto';
import { VoucherService } from '../voucher/voucher.service';
import { FileService } from '../file/file.service';

@Injectable()
export class PurchaseOrderService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly voucherService: VoucherService,
    private readonly fileService: FileService,
  ) {}

  async create(createPurchaseOrderDto: CreatePurchaseOrderDto) {
    const {
      customerId,
      employeeId,
      taxCode,
      recipientName,
      description,
      paymentTermId,
      creditDays,
      isCosting,
      orderStatus,
      deliveryStatus,
      deliveryDate,
      deliveryAddress,
      // Các thuộc tính dùng để tạo voucher
      companyId,
      postedDate,
      voucherDate,
      voucherNumber,
      circularId,
      fileBase64, // Thêm trường fileBase64 từ DTO
      originalFileName, // Thêm trường originalFileName từ DTO
      // preUploadedFileId, // Nếu bạn muốn hỗ trợ file đã upload sẵn qua endpoint khác
    } = createPurchaseOrderDto;

    let uploadedFileId: string | undefined; // Biến để lưu ID của file đã upload

    const result = await this.prismaService.$transaction(async (tx) => {
      // --- Xử lý upload file Base64 nếu có ---
      if (fileBase64) {
        try {
          const uploadedFileInfo = await this.fileService.uploadBase64File(
            fileBase64,
            originalFileName || 'uploaded_file', // Sử dụng tên gốc hoặc tên mặc định
            companyId, // Liên kết file với companyId (nếu file model của bạn có companyId)
          );
          uploadedFileId = uploadedFileInfo.id; // Lấy ID của bản ghi file đã tạo
        } catch (error) {
          console.error(
            'Failed to upload Base64 file during purchase order creation:',
            error,
          );
          // Re-throw lỗi để đảm bảo transaction được rollback nếu upload file thất bại
          throw error;
        }
      }
      // --- Hoặc nếu bạn muốn hỗ trợ preUploadedFileId, bạn có thể thêm logic này:
      // else if (preUploadedFileId) {
      //   uploadedFileId = preUploadedFileId;
      // }

      const createVoucherDto: CreateVoucherDto = {
        voucherType: 'PURCHASE_ORDER', // Loại chứng từ là 'PURCHASE_ORDER'
        voucherDate: voucherDate,
        postedDate: postedDate,
        voucherNumber: voucherNumber,
        companyId: companyId,
        circularId: circularId,
        fileId: uploadedFileId, // Liên kết file đã upload với voucher
      };

      // Tạo voucher
      const newVoucher = await this.voucherService.createWithTransaction(
        createVoucherDto,
        tx,
      );

      // Tạo PurchaseOrder và gắn voucher
      const createdPurchaseOrder = await tx.purchaseOrder.create({
        data: {
          taxCode: taxCode,
          recipientName: recipientName,
          description: description,
          creditDays: creditDays,
          isCosting: isCosting,
          orderStatus: orderStatus,
          deliveryStatus: deliveryStatus,
          deliveryDate: deliveryDate,
          deliveryAddress: deliveryAddress,
          voucher: { connect: { id: newVoucher.id } }, // Gắn voucher đã tạo
          ...(customerId && { Customer: { connect: { id: customerId } } }),
          ...(employeeId && { Employee: { connect: { id: employeeId } } }),
          ...(paymentTermId && {
            PaymentTerm: { connect: { id: paymentTermId } },
          }),
        },
        include: {
          Customer: true,
          Employee: true,
          PaymentTerm: true,
          voucher: {
            include: {
              File: true, // Đảm bảo rằng bạn bao gồm thông tin File nếu có
            },
          },
          OrderItem_Purchase: true,
        },
      });

      return createdPurchaseOrder;
    });

    return plainToInstance(ResponsePurchaseOrderDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const purchaseOrders = await this.prismaService.purchaseOrder.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        Customer: true,
        Employee: true,
        PaymentTerm: true,
        voucher: {
          include: {
            File: true,
          },
        },
      },
    });

    return plainToInstance(ResponsePurchaseOrderDto, purchaseOrders, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const purchaseOrder = await this.prismaService.purchaseOrder.findUnique({
      where: { id },
      include: {
        Customer: true,
        Employee: true,
        PaymentTerm: true,
        voucher: {
          include: {
            File: true,
          },
        },
      },
    });

    if (!purchaseOrder || purchaseOrder.deletedAt) {
      throw new NotFoundException('PurchaseOrder not found');
    }

    return plainToInstance(ResponsePurchaseOrderDto, purchaseOrder, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updatePurchaseOrderDto: UpdatePurchaseOrderDto) {
    // Kiểm tra tồn tại
    const existingPurchaseOrder =
      await this.prismaService.purchaseOrder.findUnique({
        where: { id },
        include: { voucher: true },
      });

    if (!existingPurchaseOrder || existingPurchaseOrder.deletedAt) {
      throw new NotFoundException(
        'Purchase order not found or already deleted',
      );
    }

    const {
      customerId,
      employeeId,
      taxCode,
      recipientName,
      description,
      paymentTermId,
      creditDays,
      isCosting,
      orderStatus,
      deliveryStatus,
      deliveryDate,
      deliveryAddress,
      // Các thuộc tính dùng để cập nhật voucher
      companyId,
      postedDate,
      voucherDate,
      voucherNumber,
      circularId,
    } = updatePurchaseOrderDto;

    const result = await this.prismaService.$transaction(async (tx) => {
      // Cập nhật voucher trước
      if (existingPurchaseOrder.voucher) {
        await this.voucherService.updateWithTransaction(
          existingPurchaseOrder.voucher.id,
          {
            voucherDate,
            postedDate,
            voucherNumber,
            companyId,
            circularId,
          },
          tx,
        );
      }

      // Cập nhật PurchaseOrder
      const updatedPurchaseOrder = await tx.purchaseOrder.update({
        where: { id },
        data: {
          taxCode: taxCode,
          recipientName: recipientName,
          description: description,
          creditDays: creditDays,
          isCosting: isCosting,
          orderStatus: orderStatus,
          deliveryStatus: deliveryStatus,
          deliveryDate: deliveryDate,
          deliveryAddress: deliveryAddress,
          ...(customerId !== undefined && {
            Customer: customerId
              ? { connect: { id: customerId } }
              : { disconnect: true },
          }),
          ...(employeeId !== undefined && {
            Employee: employeeId
              ? { connect: { id: employeeId } }
              : { disconnect: true },
          }),
          ...(paymentTermId !== undefined && {
            PaymentTerm: paymentTermId
              ? { connect: { id: paymentTermId } }
              : { disconnect: true },
          }),
        },
        include: {
          Customer: true,
          Employee: true,
          PaymentTerm: true,
          voucher: {
            include: {
              File: true,
            },
          },
          OrderItem_Purchase: true,
        },
      });

      return updatedPurchaseOrder;
    });

    return plainToInstance(ResponsePurchaseOrderDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);

    await this.prismaService.purchaseOrder.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa đơn đặt hàng thành công' };
  }
}
