import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsISO8601, IsNumber, IsString } from 'class-validator';
import { CreateServiceDto } from './create-service.dto';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  city: string;

  @IsISO8601()
  start_time: Date;

  @IsISO8601()
  end_time: Date;
}
