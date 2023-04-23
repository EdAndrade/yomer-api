import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { MedicalRegistrationDto } from "./dto";

@Injectable()
export class MedicalRegistrationService{

    constructor(private prisma: PrismaService){}

    register(id: number, dto: MedicalRegistrationDto){
        return this.prisma.medicalRegistration.create({
            data: {
                ...dto,
                patientId: id
            }
        })
    }

    update(){
        return 'done!'
    }
}