import {
  Controller,
  Post,
  Body,
  HttpStatus,
  UseFilters,
  Res,
  HttpCode,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserQueryFailedFilter } from 'src/filters/user-query-failed/user-query-failed.filter';
import { ResponseDto } from 'src/utils/response-dto/response-dto';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
@UseFilters(UserQueryFailedFilter)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private config: ConfigService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    await this.authService.register(createUserDto);
    const response: ResponseDto = {
      statusCode: HttpStatus.CREATED,
      message: 'Usuário criado com sucesso!',
      error: false,
    };
    return response;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.cookie('token', await this.authService.login(loginDto), {
      httpOnly: true,
      secure: true,
      path: '/',
    });

    const response: ResponseDto = {
      statusCode: HttpStatus.OK,
      message: 'Login feito com sucesso!',
      error: false,
    };

    return response;
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response) {
    res.cookie('token', '', {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 0,
    });

    const response: ResponseDto = {
      statusCode: HttpStatus.OK,
      message: 'Logout feito com sucesso!',
      error: false,
    };

    return response;
  }

  @Post('login/google')
  loginGoogle() {
    return this.authService.loginGoogle();
  }
}
