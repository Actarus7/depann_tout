import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { CreateServiceDto } from './create-service.dto';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  city: string;

  @IsDate()
  strat_time: Date;

  @IsDate()
  end_time: Date;
}
