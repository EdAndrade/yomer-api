import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class MedicalRegistrationDto {
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  gender: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  relative_asma: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  relative_cancer: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  relative_cardiac_disease: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  relative_diabetes: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  relative_hypertension: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  relative_psychiatric_disorder: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  relative_epilepsy: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  relative_allergy: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  relative_bronchitis: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  relative_other: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  relative_describe_other: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  taking_medications: boolean;

  @ApiProperty()
  @IsString()
  medications_description: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  allergies: boolean;

  @ApiProperty()
  @IsString()
  allergies_description: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  use_tobacco: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  use_illegal_drugs: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  illegal_drugs_family_historic: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  consume_alcohol: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  cronical_disease: boolean;

  @ApiProperty()
  @IsString()
  describe_cronical_disease: string;

  @ApiProperty()
  @IsString()
  pastweeks_health_description: string;
}