import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.log('Getting Exeption', exception.code, exception.message);

    if (
      [
        'P2000',
        'P2001',
        'P2002',
        'P2003',
        'P2013',
        'P2014',
        'P2015',
        'P2017',
        'P2019',
        'P2020',
        'P2005',
        'P2003',
        'P2006',
      ].includes(exception.code)
    ) {
      const response = host.switchToHttp().getResponse<Response>();
      const responseBody = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: exception?.meta?.target
          ? `Invalid Value for ${exception.meta.target}`
          : 'Invalid Value in request',
      };
      return response.status(HttpStatus.BAD_REQUEST).json(responseBody);
    } else {
      const response = host.switchToHttp().getResponse<Response>();
      const responseBody = {
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        message: 'Internal error occurred',
      };
      return response.status(HttpStatus.BAD_REQUEST).json(responseBody);
    }
  }
}
