import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }

  cleanDB() {
    return this.$transaction([
      this.medicalRegistration.deleteMany(),
      this.patient.deleteMany(),
      this.doctor.deleteMany(),
      this.hospital.deleteMany(),
    ]);
  }
}
