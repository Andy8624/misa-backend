import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConfig } from './jwt.config';

// Class này được khởi tạo khi compile
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * Constructor for JWT Strategy
   * @constructor
   * @param {object} options - Configuration options for JWT strategy
   * @param {Function} options.jwtFromRequest - Hàm lấy token từ Authorization header
   * @param {boolean} options.ignoreExpiration - When false, checks if the token has expired. When true, expiration is not verified
   * @param {string} options.secretOrKey - Secret key used to verify the token's signature
   */
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.accessToken.secret,
    });
  }

  async validate(payload: any) {
    // console.log('2. Payload trong JwtStrategy validate Token', payload);
    if (!payload) {
      throw new UnauthorizedException('Token không hợp lệ hoặc đã hết hạn');
    }
    // Trả về thông tin user để gắn vào request
    return {
      id: payload.id,
      email: payload.email,
      name: payload.name,
    };
  }
}
