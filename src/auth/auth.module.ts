import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtStrategyService } from './strategies/jwt-strategy/jwt-strategy.service';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategyService } from './strategies/google-strategy/google-strategy.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategyService, GoogleStrategyService],
})
export class AuthModule {}
