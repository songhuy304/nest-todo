import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ErrorCodes } from '../constants';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
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

    this.logger.error(
      `❌ ${request.method} ${request.url}`,
      exception instanceof Error ? exception.stack : JSON.stringify(exception),
    );
    response.status(status).json({
      statusCode: status,
      errorCode: message.errorCode ?? ErrorCodes.INTERNAL_ERROR,
      message: message.message ?? 'Internal Server Error',
    });
  }
}
