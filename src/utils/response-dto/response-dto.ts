import { HttpStatus } from '@nestjs/common';

export class ResponseDto {
  statusCode: HttpStatus;
  message: any;
  error: boolean;
}
