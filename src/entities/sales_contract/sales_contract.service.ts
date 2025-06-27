import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSalesContractDto } from './dto/create-sales_contract.dto';
import { UpdateSalesContractDto } from './dto/update-sales_contract.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseSalesContractDto } from './dto/response-sales_contract.dto';
import { CreateVoucherDto } from '../voucher/dto/create-voucher.dto';
import { VoucherService } from '../voucher/voucher.service';

@Injectable()
export class SalesContractService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly voucherService: VoucherService,
  ) {}

  async create(createSalesContractDto: CreateSalesContractDto) {
    const {
      projectId,
      contractValue,
      contractStatus,
      shipStatus,
      customerId,
      contactEmployeeId,
      deliveryDueDate,
      paymentDueDate,
      liquidationValue,
      otherTerms,
      deliveryAdress,
      isCosting,
      isInvoiced,
      isPreSystemData,
      // Các thuộc tính dùng để tạo voucher
      companyId,
      postedDate,
      voucherDate,
      voucherNumber,
      circularId,
    } = createSalesContractDto;

    const createVoucherDto: CreateVoucherDto = {
      voucherType: 'SALES_CONTRACT', // Loại chứng từ là 'SALES_CONTRACT'
      voucherDate: voucherDate,
      postedDate: postedDate,
      voucherNumber: voucherNumber,
      companyId: companyId,
      circularId: circularId,
    };

    const result = await this.prismaService.$transaction(async (tx) => {
      // Tạo voucher
      const newVoucher = await this.voucherService.createWithTransaction(
        createVoucherDto,
        tx,
      );

      // Tạo SalesContract và gắn voucher
      const createdSalesContract = await tx.salesContract.create({
        data: {
          contractValue: contractValue,
          contractStatus: contractStatus,
          shipStatus: shipStatus,
          deliveryDueDate: deliveryDueDate,
          paymentDueDate: paymentDueDate,
          liquidationValue: liquidationValue,
          otherTerms: otherTerms,
          deliveryAdress: deliveryAdress,
          isCosting: isCosting,
          isInvoiced: isInvoiced,
          isPreSystemData: isPreSystemData,
          voucher: { connect: { id: newVoucher.id } }, // Gắn voucher đã tạo
          ...(projectId && { Project: { connect: { id: projectId } } }),
          ...(customerId && { Customer: { connect: { id: customerId } } }),
          ...(contactEmployeeId && {
            ContactEmloyee: { connect: { id: contactEmployeeId } },
          }),
        },
        include: {
          Project: true,
          Customer: true,
          ContactEmloyee: true,
          voucher: true,
        },
      });

      return createdSalesContract;
    });

    return plainToInstance(ResponseSalesContractDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const salesContracts = await this.prismaService.salesContract.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        Project: true,
        Customer: true,
        ContactEmloyee: true,
        voucher: true,
      },
    });

    return plainToInstance(ResponseSalesContractDto, salesContracts, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const salesContract = await this.prismaService.salesContract.findUnique({
      where: { id },
      include: {
        Project: true,
        Customer: true,
        ContactEmloyee: true,
        voucher: true,
      },
    });

    if (!salesContract || salesContract.deletedAt) {
      throw new NotFoundException('SalesContract not found');
    }

    return plainToInstance(ResponseSalesContractDto, salesContract, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateSalesContractDto: UpdateSalesContractDto) {
    // Kiểm tra tồn tại
    const existingSalesContract =
      await this.prismaService.salesContract.findUnique({
        where: { id },
        include: { voucher: true },
      });

    if (!existingSalesContract || existingSalesContract.deletedAt) {
      throw new NotFoundException(
        'Sales contract not found or already deleted',
      );
    }

    const {
      projectId,
      contractValue,
      contractStatus,
      shipStatus,
      customerId,
      contactEmployeeId,
      deliveryDueDate,
      paymentDueDate,
      liquidationValue,
      otherTerms,
      deliveryAdress,
      isCosting,
      isInvoiced,
      isPreSystemData,
      // Các thuộc tính dùng để cập nhật voucher
      companyId,
      postedDate,
      voucherDate,
      voucherNumber,
      circularId,
    } = updateSalesContractDto;

    const result = await this.prismaService.$transaction(async (tx) => {
      // Cập nhật voucher trước
      if (existingSalesContract.voucher) {
        await this.voucherService.updateWithTransaction(
          existingSalesContract.voucher.id,
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

      // Cập nhật SalesContract
      const updatedSalesContract = await tx.salesContract.update({
        where: { id },
        data: {
          contractValue: contractValue,
          contractStatus: contractStatus,
          shipStatus: shipStatus,
          deliveryDueDate: deliveryDueDate,
          paymentDueDate: paymentDueDate,
          liquidationValue: liquidationValue,
          otherTerms: otherTerms,
          deliveryAdress: deliveryAdress,
          isCosting: isCosting,
          isInvoiced: isInvoiced,
          isPreSystemData: isPreSystemData,
          ...(projectId !== undefined && {
            Project: projectId
              ? { connect: { id: projectId } }
              : { disconnect: true },
          }),
          ...(customerId !== undefined && {
            Customer: customerId
              ? { connect: { id: customerId } }
              : { disconnect: true },
          }),
          ...(contactEmployeeId !== undefined && {
            ContactEmloyee: contactEmployeeId
              ? { connect: { id: contactEmployeeId } }
              : { disconnect: true },
          }),
        },
        include: {
          Project: true,
          Customer: true,
          ContactEmloyee: true,
          voucher: true,
        },
      });

      return updatedSalesContract;
    });

    return plainToInstance(ResponseSalesContractDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);

    await this.prismaService.salesContract.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa hợp đồng bán thành công' };
  }
}
