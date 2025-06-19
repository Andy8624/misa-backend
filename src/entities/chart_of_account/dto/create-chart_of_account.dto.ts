import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateChartOfAccountDto {
  @Expose()
  @IsNotEmpty({ message: 'Soos tài khoản không được để trống' })
  accountNumber: string;

  @Expose()
  @IsNotEmpty({ message: 'Tên tài khoản không được để trống' })
  accountName: string;

  @Expose()
  @IsNotEmpty({ message: 'Tên tiếng anh tài khoản không được để trống' })
  englishName: string;

  @Expose()
  @IsNotEmpty({ message: 'Chi tiết tài khoản không được để trống' })
  particular: string;

  @Expose()
  @IsNotEmpty({ message: 'Đặc trưng tài khoản không được để trống' })
  characteristics: string;

  @Expose()
  @IsNotEmpty({ message: 'ID công ty không được để trống' })
  customerId: string;

  @Expose()
  @IsOptional()
  primaryAccountId?: string;
}
