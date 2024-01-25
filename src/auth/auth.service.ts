import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  register(createUserDto: CreateUserDto) {
    this.userService.create(createUserDto);
  }

  login() {
    return `This action returns all auth`;
  }

  loginGoogle() {
    return `olá google`;
  }
}
