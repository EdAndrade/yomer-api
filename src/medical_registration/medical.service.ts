import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MedicalRegistrationDto } from './dto';

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

  async update(id: number, dto: MedicalRegistrationDto) {
    const medical_registration = await this.prisma.medicalRegistration.findUnique({
      where: { id },
    });

    if(!medical_registration) throw new NotFoundException()

    return await this.prisma.medicalRegistration.update({
      where: { id },
      data: dto,
    });
  }
}
