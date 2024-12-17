import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorCode, strings } from '..';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(ExceptionsFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    this.logger.error(exception);
    console.log(exception);

    let status = 500;
    let errorMessage: string = strings.errors[ErrorCode.INTERNAL_SERVER_ERROR];

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const response = exception.getResponse();

      if (response) {
        if (typeof response === 'string') {
          errorMessage = response;
        } else if ('message' in response) {
          errorMessage = response['message'] as any;
        }
      }
    }

    response.status(status).json({
      success: false,
      error: {
        message: errorMessage,
      },
    });
  }
}
