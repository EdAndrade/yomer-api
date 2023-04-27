import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class MedicalRegistrationDto {
  @IsBoolean()
  @IsNotEmpty()
  gender: boolean;

  @IsBoolean()
  @IsNotEmpty()
  relative_asma: boolean;

  @IsBoolean()
  @IsNotEmpty()
  relative_cancer: boolean;

  @IsBoolean()
  @IsNotEmpty()
  relative_cardiac_disease: boolean;

  @IsBoolean()
  @IsNotEmpty()
  relative_diabetes: boolean;

  @IsBoolean()
  @IsNotEmpty()
  relative_hypertension: boolean;

  @IsBoolean()
  @IsNotEmpty()
  relative_psychiatric_disorder: boolean;

  @IsBoolean()
  @IsNotEmpty()
  relative_epilepsy: boolean;

  @IsBoolean()
  @IsNotEmpty()
  relative_allergy: boolean;

  @IsBoolean()
  @IsNotEmpty()
  relative_bronchitis: boolean;

  @IsBoolean()
  @IsNotEmpty()
  relative_other: boolean;

  @IsBoolean()
  @IsNotEmpty()
  relative_describe_other: boolean;

  @IsBoolean()
  @IsNotEmpty()
  taking_medications: boolean;

  @IsString()
  medications_description: string;

  @IsBoolean()
  @IsNotEmpty()
  allergies: boolean;

  @IsString()
  allergies_description: string;

  @IsBoolean()
  @IsNotEmpty()
  use_tobacco: boolean;

  @IsBoolean()
  @IsNotEmpty()
  use_illegal_drugs: boolean;

  @IsBoolean()
  @IsNotEmpty()
  illegal_drugs_family_historic: boolean;

  @IsBoolean()
  @IsNotEmpty()
  consume_alcohol: boolean;

  @IsBoolean()
  @IsNotEmpty()
  cronical_disease: boolean;

  @IsString()
  describe_cronical_disease: string;

  @IsString()
  pastweeks_health_description: string;
}