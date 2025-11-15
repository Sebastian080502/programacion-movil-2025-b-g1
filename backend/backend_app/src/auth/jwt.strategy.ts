import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  Strategy as JwtStrategyBase,
  ExtractJwt,
  StrategyOptions,
} from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { JwtPayload } from './dto/jwt-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(JwtStrategyBase) {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {
    const opts: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('JWT_SECRET')!, // ← non-null (lo validamos abajo)
      ignoreExpiration: false,
    };
    super(opts);
  }

  async validate(payload: JwtPayload) {
    return this.authService.validateUser(payload);
  }
}
