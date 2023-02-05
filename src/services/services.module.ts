import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { UsersService } from 'src/users/users.service';
import { ReservationsService } from 'src/reservations/reservations.service';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService, UsersService, ReservationsService],
  exports: [ServicesService]
})
export class ServicesModule { }
