import { Controller, Get, UseGuards } from '@nestjs/common';
import { TagService } from './tag.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.tagService.findAll();
  }
}
