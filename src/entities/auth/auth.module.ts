import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../../config/jwt/jwt.strategy';
import { PrismaService } from 'src/prisma.service';
import { jwtConfig } from 'src/config/jwt/jwt.config';
import { AccountantService } from '../accountant/accountant.service';
import { AccountantModule } from '../accountant/accountant.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConfig.accessToken.secret,
      signOptions: {
        expiresIn: jwtConfig.accessToken.expiresIn,
        algorithm: 'HS512',
      },
    }),
    AccountantModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PrismaService, AccountantService],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
