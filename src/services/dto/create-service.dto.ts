import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  city: string;

  @IsDate()
  start_time: Date;

  @IsDate()
  end_time: Date;
}
