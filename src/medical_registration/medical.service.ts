import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MedicalRegistrationDto, MedicalRegistrationUpdateDto } from './dto';

@Injectable()
export class MedicalRegistrationService {
  constructor(private prisma: PrismaService) {}

  async register(id: number, dto: MedicalRegistrationDto) {
    return await this.prisma.medicalRegistration.create({
      data: {
        ...dto,
        patientId: id,
      },
    });
  }

  async update(id: number, dto: MedicalRegistrationUpdateDto) {
    return await this.prisma.medicalRegistration.update({
      where: { id },
      data: dto,
    });
  }
}
