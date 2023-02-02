import { IsEmail, IsOptional, IsString } from "class-validator";

export class CreateUserDto {

    @IsString()
    username: string;

    @IsEmail()
    e_mail: string;

    @IsString()
    password: string;

    @IsString()
    adress_line1: string;
    
    @IsString()
    @IsOptional()
    adress_line2: string;
    
    @IsString()
    @IsOptional()
    adress_line3: string;

    @IsString()
    zipCode: string;
    
    @IsString()
    city: string;

};
