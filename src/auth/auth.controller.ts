import { Controller, Post, Body, HttpStatus, UseFilters, Res, HttpCode, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserQueryFailedFilter } from 'src/filters/user-query-failed/user-query-failed.filter';
import { ResponseDto } from 'src/utils/response-dto/response-dto';

@Controller('auth')
@UseFilters(UserQueryFailedFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
    const token = await this.authService.login(loginDto);
    const response: ResponseDto = {
      statusCode: HttpStatus.OK,
      message: { token },
      error: false,
    };
    return response;
  }
}
