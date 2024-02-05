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

  async register(createUserDto: CreateUserDto, userGoogle = false) {
    const user = this.userService.create(createUserDto, userGoogle);
    return user;
  }

  async login(loginDto: LoginDto) {
    let user: User = await this.userService.findOneByEmail(loginDto.email, loginDto.userGoogle);

    if (!user && loginDto.userGoogle) {
      user = await this.register(
        {
          email: loginDto.email,
          password: ' ',
          firstName: loginDto.firstName,
          lastName: loginDto.lastName,
        },
        true,
      );
    }

    if (user && user.google && !loginDto.userGoogle)
      throw new UnauthorizedException('Seu email foi cadastrado usando o google!');

    if (user && !user.google && loginDto.userGoogle)
      throw new UnauthorizedException('Seu email foi cadastrado usando email/password!');

    if (!(user.google || (await bcrypt.compare(loginDto.password, user?.password))))
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
