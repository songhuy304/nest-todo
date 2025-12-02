// src/modules/auth/strategies/jwt.strategy.ts
import { jwtConfig } from '@/config';
import { User } from '@/modules/users/entities';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret!,
    });
  }

  validate(payload: User) {
    const userId = payload.id;
    return this.authService.validateJwtUser(userId);
  }
}
