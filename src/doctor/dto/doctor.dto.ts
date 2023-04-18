import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsRFC3339,
  IsString,
} from 'class-validator';
export class DoctorDto {
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
  @IsNotEmpty()
  role: string;

  @IsInt()
  @IsNotEmpty()
  years_of_experience: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  avatar: string;

  @IsInt()
  @IsNotEmpty()
  hospitalId: number;
}

export class DoctorSigninDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

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
