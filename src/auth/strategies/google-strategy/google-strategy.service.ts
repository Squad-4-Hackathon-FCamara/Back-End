import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GoogleStrategyService extends PassportStrategy(Strategy, 'google') {
  constructor(
    private config: ConfigService,
    private userService: UserService,
  ) {
    super({
      clientID: config.get('Client_ID_Google'),
      clientSecret: config.get('Client_Secret_Google'),
      callbackURL: config.get('Callback_URL_Google'),
      scope: ['email', 'profile'],
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
    let user: User = await this.userService.findOneByEmail(profile.emails[0].value, true);
    if (!user)
      user = await this.userService.create(
        {
          email: profile.emails[0].value,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName ?? ' ',
          password: `${Math.random()}`,
        },
        true,
      );

    //o que retornar aqui na função done vai para o req.user
    done(null, { id: user.id, email: user.email });
  }
}
