import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientDto, PatientSigninDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

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
  @UseGuards(AuthGuard('jwt'))
  getAll(){
    return this.patient.getAll()
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  getById(@Param('id', ParseIntPipe) id: number){
    return this.patient.getById(id)
  }

  @Get('doctor/:id')
  @UseGuards(AuthGuard('jwt'))
  getByDoctor(@Param('id', ParseIntPipe) id: number){
    return this.patient.getByDoctor(id)
  }
}