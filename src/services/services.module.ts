import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService, UsersService],
})
export class ServicesModule {}
