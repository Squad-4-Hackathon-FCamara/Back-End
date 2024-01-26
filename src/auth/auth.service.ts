import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async register(createUserDto: CreateUserDto) {
    const user = this.userService.create(createUserDto);
    return user;
  }

  login() {
    return `This action returns all auth`;
  }

  loginGoogle() {
    return `olá google`;
  }
}
