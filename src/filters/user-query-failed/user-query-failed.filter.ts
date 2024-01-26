import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Request, Response } from 'express';
import { ResponseDto } from 'src/utils/response-dto/response-dto';

@Catch(QueryFailedError)
export class UserQueryFailedFilter<T> implements ExceptionFilter {
  code: string;
  message: string;
  status: HttpStatus;

  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const response: Response = host.switchToHttp().getResponse<Response>();
    const request: Request = host.switchToHttp().getRequest<Request>();

    this.status = HttpStatus.INTERNAL_SERVER_ERROR;
    this.message = (exception.driverError as any).detail;
    this.code = (exception.driverError as any).code;

    switch (this.code) {
      case '23505':
        this.status = HttpStatus.CONFLICT;
        this.message = `Email '${request.body.email}' já cadastrado!`;
        break;
      case '42P01':
        this.status = HttpStatus.UNPROCESSABLE_ENTITY;
        this.message = `Tabela necessária inexistente!`;
        break;
      default:
        this.status = HttpStatus.SERVICE_UNAVAILABLE;
        this.message = exception.message;
        break;
    }

    this.code = this.code ?? '500';

    response.status(this.status).json({
      statusCode: this.code,
      message: this.message,
      error: true,
      method: request.method,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
