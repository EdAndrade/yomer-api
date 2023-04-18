import { Module } from '@nestjs/common';
import { HospitalModule } from './hospital/hospital.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { DoctorModule } from './doctor/doctor.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PatientModule } from './patient/patient.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/public',
    }),
    HospitalModule,
    DoctorModule,
    PatientModule,
    PrismaModule,
  ],
})
export class AppModule {}
