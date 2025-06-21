import { IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateAccountantDto {
  @Expose()
  @IsNotEmpty({ message: 'Full name cannot be empty' })
  fullName: string;

  @Expose()
  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  email: string;

  @Expose()
  @Matches(/^(0)(9|3|7|8|5)[0-9]{8}$/, {
    message: 'Invalid phone number',
  })
  phoneNumber: string;

  @Expose()
  @IsNotEmpty({ message: 'Birth date cannot be empty' })
  birthDate: Date;

  @Expose()
  @IsNotEmpty({ message: 'Gender cannot be empty' })
  gender: string;

  @Expose()
  avatarUrl: string;

  @Expose()
  address: string;

  @Expose()
  zipCode: string;

  @Expose()
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
