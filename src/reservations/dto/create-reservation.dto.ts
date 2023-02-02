import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateReservationDto {

    @IsNumber()
    @IsNotEmpty()
    numero: number;

    @IsNumber()
    @IsNotEmpty()
    service: number;

    @IsNumber()
    @IsNotEmpty()
    user: number;

}
