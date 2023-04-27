import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsRFC3339,
  IsString,
} from 'class-validator';

export class DoctorDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty()
  @IsRFC3339()
  @IsNotEmpty()
  birthdate: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  role: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  years_of_experience: number;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  avatar: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  hospitalId: number;
}

export class DoctorSigninDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export const DoctorPrismaSelectionDto = {
  id: true,
  first_name: true,
  last_name: true,
  is_active: true,
  birthdate: true,
  role: true,
  years_of_experience: true,
  email: true,
  avatar: true,
  hospitalId: true,
};
