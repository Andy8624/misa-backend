import { Body, Controller, Post } from '@nestjs/common';
import {
  ChangePasswordDto,
  LoginDTO,
  RegisterDTO,
  RegisterResponseDto,
} from './dto/auth.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { ApiPublicEndpoint } from 'src/config/custom-decorator/api-security.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiPublicEndpoint('User register', 'Register new account for accountant')
  register(@Body() body: RegisterDTO): Promise<RegisterResponseDto> {
    console.log(body);
    return this.authService.register(body);
  }

  @Post('Login')
  @ApiPublicEndpoint(
    'User login',
    'Accountant login. Authenticate user and return JWT token',
  )
  login(@Body() body: LoginDTO): Promise<any> {
    return this.authService.login(body);
  }

  @Post('change-password')
  @ApiPublicEndpoint('User login', 'Change password for accountant')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(changePasswordDto);
  }
}
