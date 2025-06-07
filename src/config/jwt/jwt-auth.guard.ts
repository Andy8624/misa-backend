import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../../auth/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // console.log('1. Route có public không: ', isPublic);
    // console.log('1. Context khi kiểm tra route có public không', context);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any) {
    // console.log('3. User sau khi kiểm tra access_token', user);
    // console.log('3. Lỗi sau khi kiểm tra access_token', err);
    if (err || !user) {
      throw new UnauthorizedException('Token không hợp lệ hoặc đã hết hạn');
    }
    return user;
  }
}
