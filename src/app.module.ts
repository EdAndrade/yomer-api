import { Module } from '@nestjs/common';
import { HospitalModule } from './hospital/hospital.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),HospitalModule, PrismaModule],
})
export class AppModule {}