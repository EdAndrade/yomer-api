import { IsNotEmpty, IsNumber, IsRFC3339, IsString } from 'class-validator';

export class PatientDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsRFC3339()
  @IsNotEmpty()
  birthdate: string;

  @IsString()
  medical_registration: string;

  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsNumber()
  doctorId: number;
}

export class PatientSigninDto{
  @IsNotEmpty()
  @IsString()
  phone_number: string

  @IsNotEmpty()
  @IsString()
  password: string
}

export const PatientPrismaSelectionDto = {
  id: true,
  first_name: true,
  last_name: true,
  phone_number: true,
  birthdate: true,
  medical_registration: true,
  doctorId: true
}