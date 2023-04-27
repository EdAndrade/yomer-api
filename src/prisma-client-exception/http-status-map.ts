import { HttpStatus } from '@nestjs/common';

export const HttpStatusMap = {
  [HttpStatus.CONFLICT]: {
    message: 'Resource already exists',
    code: HttpStatus.CONFLICT,
  },
  [HttpStatus.NOT_FOUND]: {
    message: 'Resource not found',
    code: HttpStatus.NOT_FOUND,
  },
  [HttpStatus.BAD_REQUEST]: (message) => ({
    message: message ? message : 'Bad Request',
    code: HttpStatus.NOT_FOUND,
  }),
};

export interface HttpStatusMap {
  message: string;
  code: number;
}