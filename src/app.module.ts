import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReservationsModule } from './reservations/reservations.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [UsersModule, ReservationsModule, ServicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
