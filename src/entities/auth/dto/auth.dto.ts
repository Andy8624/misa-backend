import { Exclude, Expose, Transform } from 'class-transformer';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterDTO {
  @IsNotEmpty({
    message: 'Full name cannot be empty',
  })
  fullName: string;

  // Regex for Vietnamese phone numbers:
  // - Starts with 0
  // - Followed by 9 or 3 or 7 or 8 or 5
  // - Followed by 8 digits
  // Valid examples: 0912345678, 0323456789, 0791234567
  @Matches(/^(0)(9|3|7|8|5)[0-9]{8}$/, {
    message:
      'Invalid phone number. Please enter a 10-digit Vietnamese phone number',
  })
  @IsNotEmpty({
    message: 'Phone number cannot be empty',
  })
  phoneNumber: string;

  @IsEmail(
    {},
    {
      message: 'Invalid email',
    },
  )
  @IsNotEmpty({
    message: 'Email cannot be empty',
  })
  email: string;

  @IsNotEmpty({
    message: 'Birth date cannot be empty',
  })
  @Transform(({ value }) => new Date(value))
  birthDate: Date;

  @IsNotEmpty({
    message: 'Gender cannot be empty',
  })
  @IsIn(['male', 'female', 'other'], {
    message: 'Gender must be one of the following values: male, female, other',
  })
  gender: string;

  @IsNotEmpty({
    message: 'Password cannot be empty',
  })
  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  password: string;
}

export class LoginDTO {
  @IsEmail(
    {},
    {
      message: 'Invalid email',
    },
  )
  @IsNotEmpty({
    message: 'Email cannot be empty',
  })
  email: string;

  @IsNotEmpty({
    message: 'Password cannot be empty',
  })
  password: string;
}

export class AuthResponseDto {
  @Expose()
  access_token: string;

  @Exclude()
  // This will be sent via cookies later
  refresh_token: string;
}

export class RegisterResponseDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  fullName: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  birthDate: Date;

  @Expose()
  gender: string;

  @Expose()
  createdAt: Date;
}

export class ChangePasswordDto {
  @IsNotEmpty({ message: 'Email cannot be empty' })
  email: string;

  @IsNotEmpty({ message: 'Old password cannot be empty' })
  oldPassword: string;

  @IsNotEmpty({ message: 'New password cannot be empty' })
  @MinLength(6, { message: 'New password must be at least 6 characters long' })
  newPassword: string;
}

export class AccessTokenDto {
  @Expose()
  @IsOptional()
  access_token: string;
}
