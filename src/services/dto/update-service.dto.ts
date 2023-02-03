import { PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsNumber, IsString } from 'class-validator';
import { CreateServiceDto } from './create-service.dto';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
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
