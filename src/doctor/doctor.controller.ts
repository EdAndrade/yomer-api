import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { DoctorDto, DoctorSigninDto } from "./dto";
import { DoctorService } from "./doctor.service";

@Controller('doctor')
export class DoctorController{

    constructor(private doctor: DoctorService){}

    @Post('signup')
    signup(@Body() dto: DoctorDto){
        return this.doctor.signup(dto)
    }

    @Post('signin')
    signin(@Body() dto: DoctorSigninDto){
        return this.doctor.signin(dto)
    }

    @Get('')
    getAll(){
        return this.doctor.getAll()
    }

    @Get('me')
    getDoctorById(@Param() id: number){
        return this.doctor.getDoctorById(id)
    }

    @Get('byhospital')
    getDoctorsByHospitalId(@Param() id: number){
        return this.doctor.getDoctorsByHospitalId(id)
    }
}