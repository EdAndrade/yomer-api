import { Injectable, NotFoundException } from "@nestjs/common";
import { HospitalDto, HospitalSigninDto } from "./dto";
import * as argon from "argon2"
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class HospitalService{

    constructor(private prisma: PrismaService){}

    async signin(dto: HospitalSigninDto){

        const hospital = await this.prisma.hospital.findUnique({
            where: {
                email: dto.email
            }
        })

        if(!hospital) throw new NotFoundException('Hospital does not exists')

        const passwordMatch = await argon.verify(hospital.password, dto.password)

        if(!passwordMatch) throw new NotFoundException('Hospital does not exists')

        delete hospital.password
        return hospital
    }

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

    async getAll(){
        return await this.prisma.hospital.findMany({
            select: {
                name: true,
                id: true,
                location: true,
                is_central: true,
                email: true
            }
        })
    }
}