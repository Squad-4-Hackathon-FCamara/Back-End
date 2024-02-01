import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy, 'jwt') {
  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategyService.extractJWTFromCookies]),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET_KEY'),
      issuer: config.get('TOKEN_ISSUER'),
      audience: config.get('TOKEN_AUDIENCE'),
    });
  }

  async validate(payload: any) {
    console.log('no validate da strategy');

    return payload;
  }

  private static extractJWTFromCookies(req: Request) {
    if (req.cookies && 'token' in req.cookies && req.cookies.token.length > 0)
      return req.cookies.token;
    return null;
  }
}
