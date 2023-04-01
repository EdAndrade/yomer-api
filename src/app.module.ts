import { Module } from '@nestjs/common';
import { HospitalModule } from './hospital/hospital.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [HospitalModule, PrismaModule],
})
export class AppModule {}