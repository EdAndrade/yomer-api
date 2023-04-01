import { Body, Controller, Post } from "@nestjs/common";
import { DoctorDto } from "./dto";
import { DoctorService } from "./doctor.service";

@Controller('doctor')
export class DoctorController{

    constructor(private doctor: DoctorService){}

    @Post('signup')
    signup(@Body() dto: DoctorDto){
        return this.doctor.signup(dto)
    }

}