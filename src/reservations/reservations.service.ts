import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation } from './entities/reservation.entity';


@Injectable()
export class ReservationsService {

  // CREATION D'UNE RESERVATION
  async create(createReservationDto: CreateReservationDto | any, numero: number, userIdLogged: number | any) {
    const newReservation = new Reservation();
    newReservation.numero = numero;
    newReservation.service = createReservationDto.service;
    newReservation.user = userIdLogged;

    await newReservation.save();
    
    return newReservation;
    
  };

  // RECUPERE TOUTES LES RESERVATIONS
  async findAll() {
    const reservations = await Reservation.find({relations: {user: true, service: true}});

    if (reservations) {
      return reservations;
    };

    return undefined;
  };
  
  // RECUPERE TOUS LES NUMEROS DE RESERVATIONS
  async findAllNumbers() {
    const reservations = await Reservation.find({
      select: {numero: true}
    });

    if (reservations) {
      return reservations;
    };

    return undefined;
  };

  // RECUPERE UNE RESERVATION PAR SON ID
  async findOne(id: number) {
    const reservation = await Reservation.find({relations: { service: true, user: true,}, where: {id: id}});

    if (reservation) {
      return reservation;
    };

    return undefined;
  };

  // RECUPERE UNE RESERVATION PAR L'ID DU SERVICE ASSOCIE
  async findOneByServiceId (id :number | any) {
    const reservation = Reservation.findOneBy({service: {id: id}});

    if (reservation) {
      return reservation;
    };

    return undefined;
  };

  // SUPPRIME UNE RESERVATION (intervient lors de la suppression d'un service)
  async remove(id: number | any) {
    const deleteReservation = await Reservation.findOneBy(id);
    deleteReservation.remove();

    if (deleteReservation) {
      return deleteReservation;
    };
    
    return undefined;
  } ;
};



// NON DEMANDE SUR LE BRIEF
  /* update(id: number) {
    return `This action updates a #${id} reservation`;
  }*/