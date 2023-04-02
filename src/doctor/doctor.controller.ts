import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
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

    @Get('me:id')
    getDoctorById(@Param('id', ParseIntPipe) id: number){
        return this.doctor.getDoctorById(id)
    }

    @Get('byhospital:id')
    getDoctorsByHospitalId(@Param('id', ParseIntPipe) id: number){
        return this.doctor.getDoctorsByHospitalId(id)
    }
}