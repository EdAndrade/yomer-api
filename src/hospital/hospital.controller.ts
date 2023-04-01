import { Body, Controller, Post } from "@nestjs/common";
import { HospitalDto } from "./dto";
import { HospitalService } from "./hospital.service";


@Controller('hospital')
export class HospitalController{

    constructor(private hospitalService: HospitalService){}

    @Post('')
    signup(@Body() dto: HospitalDto){
        return this.hospitalService.signup(dto)
    }
}