import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DoctorDto, DoctorPrismaSelectionDto, DoctorSigninDto } from './dto';
import * as argon from 'argon2';

@Injectable({})
export class DoctorService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: DoctorDto) {
    const { password, ...doctorRest } = dto;
    const hash = await argon.hash(password);
    const doctor = await this.prisma.doctor.create({
      data: {
        ...doctorRest,
        password: hash,
      },
    });
    delete doctor.password;
    return doctor;
  }

  async signin(dto: DoctorSigninDto) {
    const doctor = await this.prisma.doctor.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!doctor) throw new NotFoundException('Doctor does not exits');
    const passwordMatch = await argon.verify(doctor.password, dto.password);
    if (!passwordMatch) throw new NotFoundException('Doctor does not exists');

    delete doctor.password;
    return doctor;
  }

  async getDoctorById(id: number) {
    const doctor = await this.prisma.doctor.findUnique({
      where: {
        id,
      },
      include: {
        hospital: {
          select: {
            name: true,
            id: true,
            location: true,
            is_central: true,
            email: true,
          },
        },
      },
    });

    if (!doctor) throw new NotFoundException('Doctor does not exists');
    delete doctor.password;
    return doctor;
  }

  async getDoctorsByHospitalId(id: number) {
    return await this.prisma.doctor.findMany({
      where: {
        hospitalId: id,
      },
      select: DoctorPrismaSelectionDto,
    });
  }

  async getAll() {
    return await this.prisma.doctor.findMany({
      select: DoctorPrismaSelectionDto,
    });
  }

  async changeDoctorStatus(status: boolean, id: number) {
    const doctor = await this.prisma.doctor.findUnique({
      where: {
        id,
      },
    });

    if (!doctor) throw new NotFoundException('Doctor does not exists');

    return this.prisma.doctor.update({
      where: {
        id,
      },
      data: {
        is_active: status,
      },
      select: DoctorPrismaSelectionDto,
    });
  }

  async UpdateAvatar(filename: string, id: number) {
    const doctor = await this.prisma.doctor.findUnique({
      where: {
        id,
      },
    });

    if (!doctor) throw new NotFoundException('Doctor does not exists');

    return this.prisma.doctor.update({
      where: {
        id,
      },
      data: {
        avatar: filename,
      },
      select: DoctorPrismaSelectionDto,
    });
  }
}
