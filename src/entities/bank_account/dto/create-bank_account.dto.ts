import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBankAccountDto {
  @Expose()
  @IsOptional()
  accountNumber?: string;

  @Expose()
  @IsOptional()
  provinceOrCity?: string;

  @Expose()
  @IsOptional()
  branchName?: string;

  @Expose()
  @IsOptional()
  branchAddress?: string;

  @Expose()
  @IsOptional()
  deltailBranchAddress?: string;

  @Expose()
  @IsOptional()
  partnerId?: string;

  @Expose()
  @IsOptional()
  employeeId?: string;

  @Expose()
  @IsOptional()
  bankId?: string;

  @Expose()
  @IsNotEmpty({ message: 'Id Công Ty (CustomerId) không được để trống' })
  customerId: string;
}
