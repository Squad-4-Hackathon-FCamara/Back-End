import { Controller, Get, UseGuards } from '@nestjs/common';
import { TagService } from './tag.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiCookieAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Tag } from './entities/tag.entity';
import { ResponseDto } from 'src/utils/response-dto/response-dto';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiTags('Tags')
  @ApiCookieAuth()
  @ApiOkResponse({ type: [Tag] })
  @ApiUnauthorizedResponse({ type: ResponseDto })
  findAll() {
    return this.tagService.findAll();
  }
}
