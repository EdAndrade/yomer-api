import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
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

    @Get(':id')
    getDoctorById(@Param('id', ParseIntPipe) id: number){
        return this.doctor.getDoctorById(id)
    }

    @Get('byhospital/:id')
    getDoctorsByHospitalId(@Param('id', ParseIntPipe) id: number){
        return this.doctor.getDoctorsByHospitalId(id)
    }

    @Put(':id/changestatus')
    changeDoctorStatus(@Param('id', ParseIntPipe) id: number, @Body() { status }: {status: boolean}){
        return this.doctor.changeDoctorStatus(status, id)
    }
}