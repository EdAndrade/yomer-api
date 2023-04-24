import { HttpStatus } from "@nestjs/common";

export const HttpStatusMap = {
    [HttpStatus.CONFLICT]: {
        message: 'Resource already exists',
        code: HttpStatus.CONFLICT
    }
}

export interface HttpStatusMap{
    message: string;
    code: number;
}