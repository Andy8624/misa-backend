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

  register = async (userData: RegisterDTO): Promise<RegisterResponseDto> => {
    // Kiểm tra email được dùng chưa
    const existingUser = await this.accountantService.getAccountantByEmail(
      userData.email,
    );

    if (existingUser) {
      throw new ConflictException('Email đã được sử dụng');
    }

    // Hash password
    const hashPassword = await hash(userData.password, 10);

    // Lưu vào DB
    const res = await this.prismaService.accountant.create({
      data: { ...userData, password: hashPassword },
    });

    return plainToInstance(RegisterResponseDto, res, {
      excludeExtraneousValues: true, // Thêm option này
    });
  };

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

  async changePassword(
    changePasswordDto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    // Kiểm tra email có tồn tại không
    const user = await this.accountantService.getAccountantByEmail(
      changePasswordDto.email,
    );

    if (!user) {
      throw new ConflictException('Người dùng không tồn tại');
    }

    const isPasswordValid = await compare(
      changePasswordDto.oldPassword,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Mật khẩu cũ không đúng');
    }

    const hashedNewPassword = await hash(changePasswordDto.newPassword, 10);

    await this.prismaService.accountant.update({
      where: { email: changePasswordDto.email },
      data: { password: hashedNewPassword },
    });

    return { message: 'Đổi mật khẩu thành công' };
  }

  private async validateUser(credentials: LoginDTO): Promise<Accountant> {
    const user = await this.accountantService.getAccountantByEmail(
      credentials.email,
    );
    // console.log('Login Validate', credentials.email);
    // console.log('Login Validate', user);

    if (!user) {
      throw new NotFoundException('Tài khoản không tồn tại');
    }

    const isPasswordValid = await compare(credentials.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Mật khẩu không đúng');
    }

    return user;
  }

  // Nào rãnh tách ra JwtAuthService
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
