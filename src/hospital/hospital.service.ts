import { Injectable } from "@nestjs/common";
import { HospitalDto } from "./dto";
import * as argon from "argon2"
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class HospitalService{

    constructor(private prisma: PrismaService){}

    async signup(dto: HospitalDto){

        const hash = await argon.hash(dto.password)
        const hospital = await this.prisma.hospital.create({
            data: {
                name: dto.name,
                email: dto.email,
                password: hash,
                is_central: dto.is_central,
                location: dto.location
            }
        })
        return hospital
    }
}