import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConfig } from './jwt.config';

// This class is initialized during compilation
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * Constructor for JWT Strategy
   * @constructor
   * @param {object} options - Configuration options for JWT strategy
   * @param {Function} options.jwtFromRequest - Function to extract the token from the Authorization header
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
    // console.log('2. Payload in JwtStrategy validate Token', payload);
    if (!payload) {
      throw new UnauthorizedException('Invalid or expired token');
    }
    // Return user information to be attached to the request
    return {
      id: payload.id,
      email: payload.email,
      name: payload.name,
    };
  }
}
