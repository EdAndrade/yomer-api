import { Injectable, NotFoundException } from '@nestjs/common';
import { HospitalDto, HospitalSigninDto } from './dto';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class HospitalService {
  constructor(private prisma: PrismaService, private auth: AuthService) {}

  async signin(dto: HospitalSigninDto) {
    const hospital = await this.prisma.hospital.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!hospital) throw new NotFoundException('Hospital does not exists');

    const passwordMatch = await argon.verify(hospital.password, dto.password);

    if (!passwordMatch) throw new NotFoundException('Hospital does not exists');

    const token = await this.auth.generateToken(hospital.email);
    delete hospital.password;
    return { token, ...hospital };
  }

  async signup(dto: HospitalDto) {
    const { password, ...hospitalRest } = dto;
    const hash = await argon.hash(password);
    const hospital = await this.prisma.hospital.create({
      data: {
        ...hospitalRest,
        password: hash,
      },
    });

    delete hospital.password;
    return hospital;
  }

  async getAll() {
    return await this.prisma.hospital.findMany({
      select: {
        name: true,
        id: true,
        location: true,
        is_central: true,
        email: true,
      },
    });
  }
}
