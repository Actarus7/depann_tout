import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationsService {
  async create(createReservationDto: CreateReservationDto | any, numero: number, userIdLogged: number | any) {
    const newReservation = new Reservation();
    newReservation.numero = numero;
    newReservation.service = createReservationDto.service;
    newReservation.user = userIdLogged;

    await newReservation.save();
    
    return newReservation;
    
  };


  async findAll() {
    const reservations = await Reservation.find();

    if (reservations) {
      return reservations;
    };

    return undefined;
  };
  async findAllNumbers() {
    const reservations = await Reservation.find({
      select: {numero: true}
    });

    if (reservations) {
      return reservations;
    };

    return undefined;
  };

  async findOne(id: number) {
    const reservation = await Reservation.findOneBy({id: id});

    if (reservation) {
      return reservation;
    };

    return undefined;
  };

  update(id: number) {
    return `This action updates a #${id} reservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }
}
