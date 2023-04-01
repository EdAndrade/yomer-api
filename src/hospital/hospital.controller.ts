import { Body, Controller, Get, Post } from "@nestjs/common";
import { HospitalDto, HospitalSigninDto } from "./dto";
import { HospitalService } from "./hospital.service";

@Controller('hospital')
export class HospitalController{

    constructor(private hospitalService: HospitalService){}

    @Post('signup')
    signup(@Body() dto: HospitalDto){
        return this.hospitalService.signup(dto)
    }

    @Post('signin')
    signin(@Body() dto: HospitalSigninDto){
        return this.hospitalService.signin(dto)
    }

    @Get('')
    getAll(){
        return this.hospitalService.getAll()
    }
}