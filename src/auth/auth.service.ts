import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login-dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const user = this.userService.create(createUserDto);
    return user;
  }

  async login(loginDto: LoginDto, userGoogle = false) {
    const user: User = await this.userService.findOneByEmail(loginDto.email);

    if (user.google && !userGoogle)
      throw new UnauthorizedException('Seu email foi cadastrado usando o google!');

    if (!user || !(userGoogle || (await bcrypt.compare(loginDto.password, user?.password))))
      throw new UnauthorizedException('Usuário ou senha inválidos!');

    const payload = {
      id: user.id,
    };

    return this.jwtService.sign(payload, {
      expiresIn: String(process.env.JWT_EXPIRATION_DATE),
      subject: user.id,
      issuer: String(process.env.JWT_ISSUER),
      audience: String(process.env.JWT_AUDIENCE),
      secret: String(process.env.JWT_SECRET_KEY),
    });
  }

  loginGoogle() {
    return `olá google`;
  }
}
