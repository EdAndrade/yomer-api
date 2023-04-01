import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator"

export class HospitalDto{

    @IsNotEmpty()
    @IsString()
    name: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    @IsNotEmpty()
    location: string

    @IsBoolean()
    is_central?: boolean
}

export class HospitalSigninDto{

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string
}