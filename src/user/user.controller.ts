import { Controller, Get, Body, Param, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import {
  ApiTags,
  ApiCookieAuth,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiCookieAuth()
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Get('me/data')
  @UseGuards(AuthGuard('jwt'))
  @ApiCookieAuth()
  @ApiOkResponse()
  @ApiNotFoundResponse()
  me(@Req() req: Request) {
    const { id: userId } = req.user as { id: string };
    return this.userService.findOne(userId);
  }
}
