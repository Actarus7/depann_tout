import { IsString } from "class-validator";

export class LoginUserDto {

    @IsString()
    username: string;

    @IsString()
    password: string;

   /*  @IsEmail()
    @IsOptional()
    e_mail: string; */

};