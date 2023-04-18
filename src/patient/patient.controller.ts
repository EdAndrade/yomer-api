import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientDto, PatientSigninDto } from './dto';

@Controller('patient')
export class PatientController {
  constructor(private patient: PatientService) {}

  @Post('signup')
  signup(@Body() dto: PatientDto) {
    return this.patient.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: PatientSigninDto){
    return this.patient.signin(dto);
  }

  @Get('')
  getAll(){
    return this.patient.getAll()
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number){
    return this.patient.getById(id)
  }

  @Get('doctor/:id')
  getByDoctor(@Param('id', ParseIntPipe) id: number){
    return this.patient.getByDoctor(id)
  }
}