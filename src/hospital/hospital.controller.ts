import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { HospitalDto, HospitalSigninDto } from './dto';
import { HospitalService } from './hospital.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('hospital')
export class HospitalController {
  constructor(private hospitalService: HospitalService) {}

  @Post('signup')
  signup(@Body() dto: HospitalDto) {
    return this.hospitalService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: HospitalSigninDto) {
    return this.hospitalService.signin(dto);
  }

  @Get('')
  @UseGuards(AuthGuard('jwt'))
  getAll() {
    return this.hospitalService.getAll();
  }
}
