import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto {
  @ApiProperty()
  statusCode: HttpStatus;

  @ApiProperty()
  message: any;

  @ApiProperty()
  error: boolean;
}
