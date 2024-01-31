import {
  Controller,
  Post,
  Body,
  HttpStatus,
  UseFilters,
  Res,
  HttpCode,
  UseGuards,
  Req,
  Get,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserQueryFailedFilter } from 'src/filters/user-query-failed/user-query-failed.filter';
import { ResponseDto } from 'src/utils/response-dto/response-dto';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

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
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    res.cookie('token', await this.authService.login(loginDto), {
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'none',
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
  async logout(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    res.cookie('token', '', {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: 0,
    });

    req.user = undefined;

    const response: ResponseDto = {
      statusCode: HttpStatus.OK,
      message: 'Logout feito com sucesso!',
      error: false,
    };

    return response;
  }

  @Get('login/google')
  @UseGuards(AuthGuard('google'))
  loginGoogle(@Req() req: Request) {
    return this.authService.loginGoogle();
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const { email } = req.user as { email: string };

    const token = await this.authService.login({ email: email, password: '' }, true);

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'none',
    });

    const response: ResponseDto = {
      statusCode: HttpStatus.OK,
      message: 'Login feito com sucesso!',
      error: false,
    };

    return response;
  }
}
