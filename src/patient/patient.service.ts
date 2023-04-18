import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PatientDto, PatientPrismaSelectionDto, PatientSigninDto } from './dto';
import * as argon from 'argon2';
import { DoctorPrismaSelectionDto } from 'src/doctor/dto';

@Injectable({})
export class PatientService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: PatientDto) {
    const { password, ...patientRest } = dto;
    const hash = await argon.hash(password);

    const patient = await this.prisma.patient.create({
      data: {
        ...patientRest,
        password: hash
      },
    });

    delete patient.password;
    return patient;
  }

  async signin(dto: PatientSigninDto){
    const patient = await this.prisma.patient.findUnique({
      where: {
        phone_number: dto.phone_number
      }
    })

    if(!patient) throw new NotFoundException('Patient does not exists')
    const passwordMatch = await argon.verify(patient.password, dto.password)
    if(!passwordMatch) throw new NotFoundException('Patient does not exists')

    delete patient.password
    return patient
  }

  async getAll(){
    return await this.prisma.patient.findMany({
      select: PatientPrismaSelectionDto
    })
  }

  async getById(id: number){
    const patient = await this.prisma.patient.findUnique({
      where: {
        id
      },
      include: {
        doctor: {
          select: DoctorPrismaSelectionDto
        }
      }
    })

    if(!patient) throw new NotFoundException('Patient does not exists')
    delete patient.password
    return patient
  }

  async getByDoctor(id: number){
    
    return this.prisma.patient.findMany({
      where: {
        doctorId: id
      },
      select: PatientPrismaSelectionDto,
    })
  }
}