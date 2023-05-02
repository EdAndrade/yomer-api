import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from "@prisma/client";
import { Response } from 'express';
import { HttpStatusMap } from './http-status-map';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception.message);
    const response = host.switchToHttp().getResponse<Response>();

    switch (exception.code) {
      case 'P2002': {
        this.exceptionResponseHandler(
          response,
          HttpStatusMap[HttpStatus.CONFLICT],
        );
        break;
      }
      case 'P2025': {
        this.exceptionResponseHandler(
          response,
          HttpStatusMap[HttpStatus.NOT_FOUND],
        );
        break;
      }
      case 'P2003': {
        this.exceptionResponseHandler(
          response,
          HttpStatusMap[HttpStatus.BAD_REQUEST]('Bad request caused by a foreign key'),
        );
        break;
      }
      default:
        super.catch(exception, host);
        break;
    }
    super.catch(exception, host);
  }

  exceptionResponseHandler(response: any, HttpStatusMap: HttpStatusMap) {
    return response.status(HttpStatusMap.code).json({
      statusCode: HttpStatusMap.code,
      message: HttpStatusMap.message,
    });
  }
}
