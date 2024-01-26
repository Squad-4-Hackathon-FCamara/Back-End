import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login-dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const user = this.userService.create(createUserDto);
    return user;
  }

  async login(loginDto: LoginDto) {
    const user: User = await this.userService.findOneByEmail(loginDto.email);

    if (!user || !(await bcrypt.compare(loginDto.password, user?.password)))
      throw new UnauthorizedException('Usuário ou senha inválidos!');

    const payload = {
      id: user.id,
    };

    return this.jwtService.sign(payload, {
      expiresIn: String(process.env.JWT_EXPIRATION_DATE),
      subject: user.id,
      issuer: 'squad4',
      audience: 'backHackaton',
      secret: String(process.env.JWT_SECRET_KEY),
    });
  }

  loginGoogle() {
    return `olá google`;
  }
}
