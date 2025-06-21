import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, Matches } from 'class-validator';
import { LegalType, PartnerType } from 'src/interfaces/partner.interface';

export class CreatePartnerDto {
  @Expose()
  @IsNotEmpty({ message: 'Partner code cannot be empty' })
  partnerCode: string;

  @Expose()
  @IsNotEmpty({ message: 'Partner type cannot be empty' })
  @IsEnum(PartnerType, {
    message: 'Partner type must be client or supplier',
  })
  partnerType: PartnerType; // Partner type 'client' | 'supplier'

  @Expose()
  @IsNotEmpty({ message: 'Legal type cannot be empty' })
  @IsEnum(LegalType, {
    message: 'Legal type must be organization or individual',
  })
  legalType: LegalType; // Legal type ('organization' | 'individual')

  @Expose()
  @IsNotEmpty({ message: 'Tax code cannot be empty' })
  taxCode: string; // Tax code

  @Expose()
  @IsNotEmpty({
    message: 'Government unit code cannot be empty',
  })
  govUnitCode: string; // Government unit code

  @Expose()
  @IsNotEmpty({ message: 'Full name cannot be empty' })
  fullName: string; // Name

  @Expose()
  @IsNotEmpty({ message: 'Address cannot be empty' })
  address: string; // Address

  @Expose()
  @Matches(/^(0)(9|3|7|8|5)[0-9]{8}$/, {
    message: 'Invalid phone number',
  })
  @IsNotEmpty({ message: 'Phone number cannot be empty' })
  phoneNumber: string; // Phone number

  @Expose()
  @IsOptional()
  websiteUrl: string; // Website URL of the partner

  @Expose()
  @IsNotEmpty({ message: 'Company ID (CustomerId) cannot be empty' })
  customerId: string;
}
