import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { DoctorDto, DoctorSigninDto } from './dto';
import { DoctorService } from './doctor.service';
import { UploadInterceptor } from '../common/interceptors';
import { Express } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('doctors')
export class DoctorController {
  constructor(private doctor: DoctorService) {}

  @Post('signup')
  signup(@Body() dto: DoctorDto) {
    return this.doctor.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: DoctorSigninDto) {
    return this.doctor.signin(dto);
  }

  @Get('')
  @UseGuards(AuthGuard('jwt'))
  getAll() {
    return this.doctor.getAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  getDoctorById(@Param('id', ParseIntPipe) id: number) {
    return this.doctor.getDoctorById(id);
  }

  @Get('hospital/:id')
  @UseGuards(AuthGuard('jwt'))
  getDoctorsByHospitalId(@Param('id', ParseIntPipe) id: number) {
    return this.doctor.getDoctorsByHospitalId(id);
  }

  @Put(':id/avatar')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(UploadInterceptor)
  UpdateAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.doctor.UpdateAvatar(file.filename, id);
  }

  @Put(':id/status')
  @UseGuards(AuthGuard('jwt'))
  changeDoctorStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() { status }: { status: boolean },
  ) {
    return this.doctor.changeDoctorStatus(status, id);
  }
}
