import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { MedicalRegistrationService } from './medical.service';
import { MedicalRegistrationDto, MedicalRegistrationUpdateDto } from './dto';

@Controller('medical_registration')
export class MedicalRegistrationController {
  constructor(private medicalRegistrationService: MedicalRegistrationService) {}

  @Post('patient/:id')
  register(
    @Body() dto: MedicalRegistrationDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.medicalRegistrationService.register(id, dto);
  }

  @Put(':id')
  update(
    @Body() dto: MedicalRegistrationUpdateDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.medicalRegistrationService.update(id, dto);
  }
}
