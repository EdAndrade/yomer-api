import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsRFC3339, IsString } from 'class-validator';

export class PatientDto {
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
  medical_registration: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  doctorId: number;
}

export class PatientSigninDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}

export const PatientPrismaSelectionDto = {
  id: true,
  first_name: true,
  last_name: true,
  phone_number: true,
  birthdate: true,
  medical_registration: true,
  doctorId: true,
};
