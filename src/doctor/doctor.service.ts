import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { DoctorDto } from "./dto";
import * as argon from "argon2"

@Injectable({})
export class DoctorService{

    constructor(private prisma: PrismaService){}

    async signup(dto: DoctorDto){

        const { password, ...doctorRest } = dto
        const hash = await argon.hash(password)
        const doctor = await this.prisma.doctor.create({
            data: {
                ...doctorRest,
                password: hash
            }
        })
        return doctor
    }
}