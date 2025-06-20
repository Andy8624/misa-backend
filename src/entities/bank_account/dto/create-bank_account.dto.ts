import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

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
}
