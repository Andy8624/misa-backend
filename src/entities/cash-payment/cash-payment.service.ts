import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseCashPaymentDto } from './dto/response-cash-payment.dto';
import { CreateCashPaymentDto } from './dto/create-cash-payment.dto';
import { UpdateCashPaymentDto } from './dto/update-cash-payment.dto';
import { VoucherService } from '../voucher/voucher.service';
import { CreateVoucherDto } from '../voucher/dto/create-voucher.dto';
import { FileService } from '../file/file.service';

@Injectable()
export class CashPaymentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly voucherService: VoucherService,
    private readonly fileService: FileService,
  ) {}

  async create(
    createCashPaymentDto: CreateCashPaymentDto,
    file: Express.Multer.File,
  ) {
    const {
      cashPaymentVoucherType,
      recipient,
      supplierName,
      reason,
      withOriginalVoucher,
      postedDate,
      voucherDate,
      voucherNumber,
      employee,
      subject,
      supplier,
      companyId,
      circularId,
    } = createCashPaymentDto;

    let uploadedFileId: string | undefined;

    const result = await this.prismaService.$transaction(async (tx) => {
      // Handle file upload if present
      if (file) {
        try {
          const uploadedFileInfo = await this.fileService.uploadFile(
            file,
            companyId,
          );
          uploadedFileId = uploadedFileInfo.id; // Get the ID of the uploaded file record
        } catch (error) {
          console.error(
            'Failed to upload file during cash payment creation:',
            error,
          );

          throw error;
        }
      }

      // Prepare data for Voucher creation
      const createVoucherDto: CreateVoucherDto = {
        voucherType: 'CASH_PAYMENT', // Set appropriate voucher type
        postedDate,
        voucherDate,
        voucherNumber,
        companyId,
        circularId,
        fileId: uploadedFileId, // Link the uploaded file to the voucher
      };

      // Create the Voucher record within the transaction
      const newVoucher = await this.voucherService.createWithTransaction(
        createVoucherDto,
        tx,
      );

      // Create the CashPayment record
      const createdCashPayment = await tx.cashPayment.create({
        data: {
          cashPaymentVoucherType,
          recipient,
          supplierName,
          reason,
          withOriginalVoucher,
          // Connect relationships based on provided IDs
          Employee: employee ? { connect: { id: employee } } : undefined,
          Subject: subject ? { connect: { id: subject } } : undefined,
          Supplier: supplier ? { connect: { id: supplier } } : undefined, // Corrected to Supplier relation
          company: companyId ? { connect: { id: companyId } } : undefined, // Use companyId from DTO
          voucher: { connect: { id: newVoucher.id } }, // Connect to the newly created voucher
        },
        include: {
          // Include related data for the response if needed
          voucher: {
            include: {
              File: true, // Include File if you want its details in the response
            },
          },
          Employee: true,
          Subject: true,
          Supplier: true, // Include Supplier
          company: true, // Include Company if it's a model
        },
      });

      return createdCashPayment;
    });

    // Transform the result into a clean response DTO (assuming ResponseCashPaymentDto exists)
    return plainToInstance(ResponseCashPaymentDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const cashPayments = await this.prismaService.cashPayment.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        Employee: true,
        Subject: true,
        Supplier: true,
        CashPaymentVoucherItem: true,
        voucher: true,
      },
    });

    return plainToInstance(ResponseCashPaymentDto, cashPayments, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const cashPayment = await this.prismaService.cashPayment.findUnique({
      where: { id },
      include: {
        Employee: true,
        Subject: true,
        Supplier: true,
        CashPaymentVoucherItem: true,
        voucher: true,
      },
    });

    if (!cashPayment || cashPayment.deletedAt) {
      throw new NotFoundException('Cash payment voucher not found');
    }

    return plainToInstance(ResponseCashPaymentDto, cashPayment, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateCashPaymentDto: UpdateCashPaymentDto) {
    // Kiểm tra xem phiếu chi có tồn tại không
    const existing = await this.prismaService.cashPayment.findUnique({
      where: { id },
      include: { voucher: true },
    });

    if (!existing || existing.deletedAt) {
      throw new NotFoundException('Cash payment voucher not found');
    }

    const {
      cashPaymentVoucherType,
      recipient,
      postedDate,
      voucherDate,
      voucherNumber,
      reason,
      withOriginalVoucher,
      employee,
      subject,
      supplier,
      circularId,
    } = updateCashPaymentDto;

    const result = await this.prismaService.$transaction(async (tx) => {
      // Cập nhật phiếu kế toán (voucher)
      await this.voucherService.updateWithTransaction(
        existing.voucher.id,
        {
          voucherDate,
          postedDate,
          voucherNumber,
          circularId,
        },
        tx,
      );

      // Cập nhật phiếu chi
      const updatedCashPayment = await tx.cashPayment.update({
        where: { id },
        data: {
          cashPaymentVoucherType,
          recipient,
          reason,
          withOriginalVoucher,
          Employee: employee ? { connect: { id: employee } } : undefined,
          Subject: subject ? { connect: { id: subject } } : undefined,
          Supplier: supplier ? { connect: { id: supplier } } : undefined,
        },
        include: {
          Employee: true,
          Subject: true,
          Supplier: true,
          CashPaymentVoucherItem: true,
          voucher: true,
        },
      });

      return updatedCashPayment;
    });

    return plainToInstance(ResponseCashPaymentDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);

    await this.prismaService.cashPayment.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa phiếu chi tiền mặt thành công' };
  }
}
