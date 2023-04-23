import { Body, Controller, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { MedicalRegistrationService } from "./medical.service";
import { MedicalRegistrationDto } from "./dto";


@Controller('medical_registration/patient/:id')
export class MedicalRegistrationController{
    constructor(private medicalRegistrationService: MedicalRegistrationService){}

    @Post('')
    register(@Body() dto: MedicalRegistrationDto, @Param('id', ParseIntPipe) id: number){
        return this.medicalRegistrationService.register(id, dto)
    }

    @Put('')
    update(){
        return this.medicalRegistrationService.update()
    }
}