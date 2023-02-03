import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  city: string;

  @IsDateString()
  start_time: Date;

  @IsDateString()
  end_time: Date;
}
