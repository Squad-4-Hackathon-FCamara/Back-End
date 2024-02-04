import { ArgumentsHost, Catch, ExceptionFilter, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionRedirectFilter<T> implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const response: Response = host.switchToHttp().getResponse<Response>();

    response.redirect(`${process.env.Client_Domain}/login`);
  }
}
