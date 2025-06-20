import { Expose, Transform, Type } from 'class-transformer';
import { ResponseEmployeeDto } from 'src/entities/employee/dto/response-employee.dto';
import { ResponseFileDto } from 'src/entities/file/dto/response-file.dto';

export class ResponseInvoiceDto {
  @Expose()
  id: string;

  @Expose()
  type: string;

  @Expose()
  verificationStatus: string;

  @Expose()
  code: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  invoiceDate: Date;

  @Expose()
  taxId: string;

  @Expose()
  invoiceNumber: string;

  @Expose()
  goodAmount: string; // BigInt representation

  @Expose()
  taxAmount: string; // BigInt representation

  @Expose()
  partnerName: string;

  @Expose()
  totalPaymentAmmount: string; // BigInt representation

  @Expose()
  invoiceValue: string; // BigInt representation

  @Expose()
  formNumber: string;

  @Expose()
  invoiceType: string;

  @Expose()
  invoiceStatus: string;

  @Expose()
  invoiceVerificationResult: string;

  @Expose()
  verificationCondition: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  lastVerificationTime: Date;

  @Expose()
  accountingStatus: string;

  @Expose()
  accountingDocument: string;

  @Expose()
  invoiceSource: string;

  @Expose()
  executinPerson: string;

  @Expose()
  file: string;

  @Expose()
  @Transform(({ value }) => value?.toISOString())
  createdAt: Date;

  // Relations
  @Expose()
  @Type(() => ResponseEmployeeDto)
  ExecutinPerson?: ResponseEmployeeDto;

  @Expose()
  @Type(() => ResponseFileDto)
  File?: ResponseFileDto;
}
