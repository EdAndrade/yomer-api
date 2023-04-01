import { IsBoolean, IsDate, IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator"

export class DoctorDto{

    @IsString()
    @IsNotEmpty()
    first_name: string

    @IsString()
    @IsNotEmpty()
    last_name: string

    @IsBoolean()
    @IsNotEmpty()
    is_active: boolean

    @IsDate()
    @IsNotEmpty()
    birthdate: string

    @IsString()
    @IsNotEmpty()
    role: string

    @IsInt()
    @IsNotEmpty()
    years_of_experience: number

    @IsEmail()
    @IsNotEmpty()
    email: string 

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    @IsNotEmpty()
    avatar: string
    
    @IsInt()
    @IsNotEmpty()
    hospitalId: number
}