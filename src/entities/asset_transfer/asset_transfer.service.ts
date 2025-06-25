import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssetTransferDto } from './dto/create-asset_transfer.dto';
import { UpdateAssetTransferDto } from './dto/update-asset_transfer.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseAssetTransferDto } from './dto/response-asset_transfer.dto';
import { VoucherService } from '../voucher/voucher.service';
import { CreateVoucherDto } from '../voucher/dto/create-voucher.dto';

@Injectable()
export class AssetTransferService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly voucherService: VoucherService,
  ) {}

  async create(createAssetTransferDto: CreateAssetTransferDto) {
    const {
      postedDate,
      voucherDate,
      voucherNumber,
      reason,
      deliveredById,
      receivedById,
      companyId,
      circularId,
    } = createAssetTransferDto;

    const createVoucherDto: CreateVoucherDto = {
      voucherType: 'ASSET_TRANSFER',
      postedDate,
      voucherDate,
      voucherNumber,
      companyId,
      circularId,
    };

    const result = await this.prismaService.$transaction(async (tx) => {
      // Tạo voucher
      const newVoucher = await this.voucherService.createWithTransaction(
        createVoucherDto,
        tx,
      );

      // Tạo asset transfer và gắn voucher
      const createdAssetTransfer = await tx.assetTransfer.create({
        data: {
          reason,
          DeliveredBy: deliveredById
            ? { connect: { id: deliveredById } }
            : undefined,
          ReceivedBy: receivedById
            ? { connect: { id: receivedById } }
            : undefined,
          Company: companyId ? { connect: { id: companyId } } : undefined,
          voucher: { connect: { id: newVoucher.id } },
        },
        include: {
          voucher: true,
          DeliveredBy: true,
          ReceivedBy: true,
          Company: true,
          AssetTransferDetail_AssetTransfer: true,
        },
      });

      return createdAssetTransfer;
    });

    return plainToInstance(ResponseAssetTransferDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const assetTransfers = await this.prismaService.assetTransfer.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        DeliveredBy: true,
        ReceivedBy: true,
        Company: true,
        AssetTransferDetail_AssetTransfer: true,
        voucher: true,
      },
    });

    return plainToInstance(ResponseAssetTransferDto, assetTransfers, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const assetTransfer = await this.prismaService.assetTransfer.findUnique({
      where: { id },
      include: {
        DeliveredBy: true,
        ReceivedBy: true,
        Company: true,
        AssetTransferDetail_AssetTransfer: true,
        voucher: true,
      },
    });

    if (!assetTransfer || assetTransfer.deletedAt) {
      throw new NotFoundException('AssetTransfer not found');
    }

    return plainToInstance(ResponseAssetTransferDto, assetTransfer, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateAssetTransferDto: UpdateAssetTransferDto) {
    // Kiểm tra tồn tại
    const existing = await this.prismaService.assetTransfer.findUnique({
      where: { id },
      include: { voucher: true },
    });

    if (!existing || existing.deletedAt) {
      throw new NotFoundException('Asset transfer voucher not found');
    }

    const {
      voucherDate,
      postedDate,
      voucherNumber,
      reason,
      deliveredById,
      receivedById,
      circularId,
    } = updateAssetTransferDto;

    const result = await this.prismaService.$transaction(async (tx) => {
      // Update voucher trước
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

      // Update asset transfer
      const updatedAssetTransfer = await tx.assetTransfer.update({
        where: { id },
        data: {
          reason,
          DeliveredBy: deliveredById
            ? { connect: { id: deliveredById } }
            : undefined,
          ReceivedBy: receivedById
            ? { connect: { id: receivedById } }
            : undefined,
        },
        include: {
          DeliveredBy: true,
          ReceivedBy: true,
          Company: true,
          AssetTransferDetail_AssetTransfer: true,
          voucher: true,
        },
      });

      return updatedAssetTransfer;
    });

    return plainToInstance(ResponseAssetTransferDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);

    await this.prismaService.assetTransfer.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa điều chuyển tài sản thành công' };
  }
}
