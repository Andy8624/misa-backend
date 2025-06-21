import {
  IsEmail,
  IsNotEmpty,
  IsIn,
  IsOptional,
  Matches,
} from 'class-validator';
import { Expose, Transform } from 'class-transformer';

export class CreateCustomerDto {
  @Expose()
  @IsOptional()
  logoUrl: string;

  @Expose()
  @IsNotEmpty({ message: 'Business type cannot be empty' })
  @IsIn(['Doanh nghiệp', 'Hộ kinh doanh'], {
    message: 'Invalid business type',
  })
  businessType: string;

  @Expose()
  @IsNotEmpty({ message: 'Tax code cannot be empty' })
  taxCode: string;

  @Expose()
  @IsNotEmpty({ message: 'Customer name cannot be empty' })
  customerName: string;

  @Expose()
  @IsOptional()
  customerGroup: string;

  @Expose()
  @IsNotEmpty({ message: 'Founded date cannot be empty' })
  @Transform(({ value }) => {
    if (value) {
      const date = new Date(value);
      return date.toISOString();
    }
    return value;
  })
  foundedDate: Date;

  @Expose()
  @IsNotEmpty({ message: 'VAT tax declaration type cannot be empty' })
  @IsIn(['month', 'quarter'], {
    message: 'Invalid VAT tax declaration type',
  })
  vatTaxType: string;

  @Expose()
  @IsNotEmpty({ message: 'Customer status cannot be empty' })
  customerStatus: string;

  @Expose()
  @IsNotEmpty({ message: 'Province/City cannot be empty' })
  province: string;

  @Expose()
  @IsNotEmpty({ message: 'District/County cannot be empty' })
  district: string;

  @Expose()
  @IsOptional()
  ward: string;

  @Expose()
  @IsNotEmpty({ message: 'Street address cannot be empty' })
  streetAddress: string;

  @Expose()
  @IsNotEmpty({ message: 'Full address cannot be empty' })
  fullAddress: string;

  @Expose()
  @IsNotEmpty({ message: 'Contact name cannot be empty' })
  contactName: string;

  @Expose()
  @Matches(/^(0)(9|3|7|8|5)[0-9]{8}$/, {
    message: 'Invalid phone number',
  })
  contactPhoneNumber: string;

  @Expose()
  @IsEmail({}, { message: 'Invalid email' })
  contactEmail: string;

  @Expose()
  @IsNotEmpty({ message: 'Contact position cannot be empty' })
  contactPosition: string;

  // @IsNotEmpty({ message: 'Accountant ID cannot be empty' })
  accountantId: string;
}
