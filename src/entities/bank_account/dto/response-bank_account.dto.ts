import { Expose, Transform, Type } from 'class-transformer';
import { ResponseBankDto } from 'src/entities/bank/dto/response-bank.dto';
import { ResponseEmployeeDto } from 'src/entities/employee/dto/response-employee.dto';
import { ResponsePartnerDto } from 'src/entities/partners/dto/response-partner-dto';

export class ResponseBankAccountDto {
  @Expose()
  id: string;

  @Expose()
  accountNumber: string;

  @Expose()
  provinceOrCity: string;

  @Expose()
  branchName: string;

  @Expose()
  branchAddress: string;

  @Expose()
  deltailBranchAddress: string;

  @Expose()
  partnerId: string;

  @Expose()
  employeeId: string;

  @Expose()
  bankId: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  createdAt: Date;

  // Relations
  @Expose()
  @Type(() => ResponsePartnerDto)
  Partner?: ResponsePartnerDto;

  @Expose()
  @Type(() => ResponseEmployeeDto)
  Employee?: ResponseEmployeeDto;

  @Expose()
  @Type(() => ResponseBankDto)
  Bank?: ResponseBankDto;
}
