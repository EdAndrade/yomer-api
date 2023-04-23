import { Module } from "@nestjs/common";
import { MedicalRegistrationService } from "./medical.service";
import { MedicalRegistrationController } from "./medical.controller";

@Module({
    controllers: [MedicalRegistrationController],
    providers: [MedicalRegistrationService]
})
export class MedicalRegistrationModule{}