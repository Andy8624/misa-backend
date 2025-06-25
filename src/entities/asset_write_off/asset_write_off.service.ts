import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssetWriteOffDto } from './dto/create-asset_write_off.dto';
import { UpdateAssetWriteOffDto } from './dto/update-asset_write_off.dto';
import { PrismaService } from 'src/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ResponseAssetWriteOffDto } from './dto/response-asset_write_off.dto';
import { CreateVoucherDto } from '../voucher/dto/create-voucher.dto';
import { VoucherService } from '../voucher/voucher.service';

@Injectable()
export class AssetWriteOffService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly voucherService: VoucherService,
  ) {}

  async create(createAssetWriteOffDto: CreateAssetWriteOffDto) {
    const {
      reason,
      postedDate,
      voucherDate,
      voucherNumber,
      companyId,
      circularId,
    } = createAssetWriteOffDto;

    const createVoucherDto: CreateVoucherDto = {
      voucherType: 'ASSET_WRITE_OFF',
      postedDate,
      voucherDate,
      voucherNumber,
      companyId,
      circularId,
    };

    const result = await this.prismaService.$transaction(async (tx) => {
      // Tạo voucher trước
      const newVoucher = await this.voucherService.createWithTransaction(
        createVoucherDto,
        tx,
      );

      // Tạo asset write-off và gắn voucher
      const createdAssetWriteOff = await tx.assetWriteOff.create({
        data: {
          reason,
          Company: companyId ? { connect: { id: companyId } } : undefined,
          voucher: { connect: { id: newVoucher.id } },
        },
        include: {
          Company: true,
          assets: true,
          accountings: true,
          voucher: true,
        },
      });

      return createdAssetWriteOff;
    });

    return plainToInstance(ResponseAssetWriteOffDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async findAll() {
    const assetWriteOffs = await this.prismaService.assetWriteOff.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        Company: true,
        assets: true,
        accountings: true,
        voucher: true,
      },
    });

    return plainToInstance(ResponseAssetWriteOffDto, assetWriteOffs, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string) {
    const assetWriteOff = await this.prismaService.assetWriteOff.findUnique({
      where: { id },
      include: {
        Company: true,
        assets: true,
        accountings: true,
        voucher: true,
      },
    });

    if (!assetWriteOff || assetWriteOff.deletedAt) {
      throw new NotFoundException('AssetWriteOff not found');
    }

    return plainToInstance(ResponseAssetWriteOffDto, assetWriteOff, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateAssetWriteOffDto: UpdateAssetWriteOffDto) {
    // Kiểm tra tồn tại
    const existing = await this.prismaService.assetWriteOff.findUnique({
      where: { id },
      include: { voucher: true },
    });

    if (!existing || existing.deletedAt) {
      throw new NotFoundException('Asset write-off voucher not found');
    }

    const {
      reason,
      postedDate,
      voucherDate,
      voucherNumber,
      circularId,
      companyId,
    } = updateAssetWriteOffDto;

    const result = await this.prismaService.$transaction(async (tx) => {
      // Cập nhật voucher trước
      await this.voucherService.updateWithTransaction(
        existing.voucher.id,
        {
          postedDate,
          voucherDate,
          voucherNumber,
          circularId,
        },
        tx,
      );

      // Cập nhật AssetWriteOff
      const updatedAssetWriteOff = await tx.assetWriteOff.update({
        where: { id },
        data: {
          reason,
          Company: companyId ? { connect: { id: companyId } } : undefined,
        },
        include: {
          Company: true,
          assets: true,
          accountings: true,
          voucher: true,
        },
      });

      return updatedAssetWriteOff;
    });

    return plainToInstance(ResponseAssetWriteOffDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.findOne(id);

    await this.prismaService.assetWriteOff.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return { message: 'Xóa bản ghi ghi giảm tài sản thành công' };
  }
}
