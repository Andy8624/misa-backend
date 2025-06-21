import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateChartOfAccountDto {
  @Expose()
  @IsNotEmpty({ message: 'Account number cannot be empty' })
  accountNumber: string;

  @Expose()
  @IsNotEmpty({ message: 'Account name cannot be empty' })
  accountName: string;

  @Expose()
  @IsNotEmpty({ message: 'Account English name cannot be empty' })
  englishName: string;

  @Expose()
  @IsNotEmpty({ message: 'Account particular cannot be empty' })
  particular: string;

  @Expose()
  @IsNotEmpty({ message: 'Account characteristics cannot be empty' })
  characteristics: string;

  @Expose()
  @IsNotEmpty({ message: 'Company ID cannot be empty' })
  customerId: string;

  @Expose()
  @IsOptional()
  primaryAccountId?: string;
}
