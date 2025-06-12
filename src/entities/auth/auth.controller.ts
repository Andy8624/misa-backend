import { Body, Controller, Post } from '@nestjs/common';
import {
  ChangePasswordDto,
  LoginDTO,
  RegisterDTO,
  RegisterResponseDto,
} from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Public } from '../../config/custom-decorator/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() body: RegisterDTO): Promise<RegisterResponseDto> {
    console.log(body);
    return this.authService.register(body);
  }

  @Public()
  @Post('Login')
  login(@Body() body: LoginDTO): Promise<any> {
    return this.authService.login(body);
  }

  @Post('change-password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(changePasswordDto);
  }
}
