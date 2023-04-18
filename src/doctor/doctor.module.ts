import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [DoctorController],
  providers: [DoctorService],
  imports: [MulterModule],
})
export class DoctorModule {}
