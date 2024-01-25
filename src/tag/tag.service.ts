import { Injectable } from '@nestjs/common';

@Injectable()
export class TagService {
  findAll() {
    return `This action returns all tag`;
  }
}
