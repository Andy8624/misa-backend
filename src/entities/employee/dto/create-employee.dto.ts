import { Expose, Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateEmployeeDto {
  @Expose()
  @IsNotEmpty({ message: 'Employee code cannot be empty' })
  employeeCode: string; // Employee Code (NV0001)

  @Expose()
  @IsNotEmpty({ message: 'Full name cannot be empty' })
  fullName: string;

  @Expose()
  @IsNotEmpty({ message: 'Date of birth cannot be empty' })
  @Transform(({ value }) => {
    if (value) {
      const date = new Date(value);
      return date.toISOString();
    }
    return value;
  })
  dob: Date; // Date of birth

  @Expose()
  @IsNotEmpty({ message: 'Gender cannot be empty' })
  sex: string; // Gender Male - Female - Other

  @Expose()
  @IsNotEmpty({ message: 'Address cannot be empty' })
  address: string; // Address

  @Expose()
  @IsNotEmpty({ message: 'Position cannot be empty' })
  position: string; // Position

  @Expose()
  @IsOptional()
  passportNumber: string; // Passport Number

  @Expose()
  @IsNotEmpty({ message: 'Phone number cannot be empty' })
  phoneNumber: string; // Phone number

  @Expose()
  @IsNotEmpty({ message: 'ID card number cannot be empty' })
  idCardNumber: string; // ID Card Number

  @Expose()
  @IsNotEmpty({ message: 'ID card issued date cannot be empty' })
  idCardIssuedDate: string; // ID Card Issued Date

  @Expose()
  @IsNotEmpty({ message: 'ID card place of issue cannot be empty' })
  idCardPlaceOfIssue: string; // ID Card Place of Issue

  @Expose()
  @IsNotEmpty({ message: 'Customer ID cannot be empty' })
  customerId: string;
}
