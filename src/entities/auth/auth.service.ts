import { AccountantService } from './../accountant/accountant.service';
import { PrismaService } from '../../prisma.service';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  AuthResponseDto,
  ChangePasswordDto,
  LoginDTO,
  RegisterDTO,
  RegisterResponseDto,
} from './dto/auth.dto';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { Accountant } from 'generated/prisma';
import { jwtConfig } from 'src/config/jwt/jwt.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly accountantService: AccountantService,
  ) {}

  /**
   * Registers a new user.
   * @param userData The registration data.
   * @returns The registered user's response DTO.
   * @throws {ConflictException} If the email is already in use.
   */
  register = async (userData: RegisterDTO): Promise<RegisterResponseDto> => {
    // Check if email is already in use
    const existingUser = await this.accountantService.getAccountantByEmail(
      userData.email,
    );

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    // Hash password
    const hashPassword = await hash(userData.password, 10);

    // Save to DB
    const res = await this.prismaService.accountant.create({
      data: { ...userData, password: hashPassword },
    });

    return plainToInstance(RegisterResponseDto, res, {
      excludeExtraneousValues: true,
    });
  };

  /**
   * Logs in a user.
   * @param credentials The login credentials.
   * @returns The authentication response DTO containing tokens.
   */
  async login(credentials: LoginDTO): Promise<AuthResponseDto> {
    const user = await this.validateUser(credentials);
    console.log(user);
    const tokens = await this.generateTokens({
      id: user.id,
      name: user.fullName,
      email: user.email,
    });

    return plainToInstance(AuthResponseDto, tokens);
  }

  /**
   * Changes a user's password.
   * @param changePasswordDto The change password data.
   * @returns A success message.
   * @throws {ConflictException} If the user does not exist.
   * @throws {UnauthorizedException} If the old password is incorrect.
   */
  async changePassword(
    changePasswordDto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    // Check if email exists
    const user = await this.accountantService.getAccountantByEmail(
      changePasswordDto.email,
    );

    if (!user) {
      throw new ConflictException('User does not exist');
    }

    const isPasswordValid = await compare(
      changePasswordDto.oldPassword,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect old password');
    }

    const hashedNewPassword = await hash(changePasswordDto.newPassword, 10);

    await this.prismaService.accountant.update({
      where: { email: changePasswordDto.email },
      data: { password: hashedNewPassword },
    });

    return { message: 'Password changed successfully' };
  }

  /**
   * Validates user credentials for login.
   * @param credentials The login credentials.
   * @returns The validated accountant user.
   * @throws {NotFoundException} If the account does not exist.
   * @throws {UnauthorizedException} If the password is incorrect.
   */
  private async validateUser(credentials: LoginDTO): Promise<Accountant> {
    const user = await this.accountantService.getAccountantByEmail(
      credentials.email,
    );
    // console.log('Login Validate', credentials.email);
    // console.log('Login Validate', user);

    if (!user) {
      throw new NotFoundException('Account does not exist');
    }

    const isPasswordValid = await compare(credentials.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect password');
    }

    return user;
  }

  // To be refactored into a separate JwtAuthService when convenient
  /**
   * Generates access and refresh tokens for a user.
   * @param payload The payload to be signed into the tokens.
   * @returns An object containing the access and refresh tokens.
   */
  async generateTokens(payload: { id: string; name: string; email: string }) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: jwtConfig.accessToken.secret,
        expiresIn: jwtConfig.accessToken.expiresIn,
      }),
      this.jwtService.signAsync(payload, {
        secret: jwtConfig.refreshToken.secret,
        expiresIn: jwtConfig.refreshToken.expiresIn,
      }),
    ]);

    return { access_token, refresh_token };
  }
}
