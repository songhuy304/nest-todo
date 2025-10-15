import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorCodes } from '../constants';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: { errorCode?: string; message?: string } = {};

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'string') {
        message = { message: res };
      } else if (typeof res === 'object' && res !== null) {
        message = res as { errorCode?: string; message?: string };
      }
    }

    response.status(status).json({
      statusCode: status,
      errorCode: message.errorCode ?? ErrorCodes.INTERNAL_ERROR,
      message: message.message ?? 'Internal Server Error',
    });
  }
}
