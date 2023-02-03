import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Res, BadRequestException, Bind, ParseIntPipe, ForbiddenException } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { ServicesService } from 'src/services/services.service';
import { Response } from 'express';

@Controller('reservations')
export class ReservationsController {
  constructor(
    private readonly reservationsService: ReservationsService,
    private readonly servicesService: ServicesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createReservationDto: CreateReservationDto,
    @Request() req,
    @Res() res: Response,
  ) {
    // VERIFIE SI LE SERVICE RESERVE EXISTE
    const isServiceExists = await this.servicesService.findOne(
      createReservationDto.service,
    );
    
    if (isServiceExists.length === 0) {
      throw new BadRequestException("Le service demandé n'existe pas ou est déjà réservé");
    };
 

    // RECUPERE LE USER ID DU USER CONNECTE
    const userIdLogged = req.user.id;


    // GENERE UN RANDOM ALEATOIRE ET VERIFIE QU'IL N'EXISTE PAS DEJA DANS LA BASE DE DONNEE
    const numeroExistants = await this.reservationsService.findAllNumbers();

    const arrayNumeroExistants = numeroExistants.map((elm) => elm.numero);

    let numero = Math.floor(Math.random() * 10000);

    while (arrayNumeroExistants.includes(numero)) {
      numero = Math.floor(Math.random() * 10000);
    };


    // CREATION D'UNE NOUVELLE RESERVATION
    const newReservation = await this.reservationsService.create(createReservationDto, numero, userIdLogged);


    // VERIFIE QUE LE USER CONNECTE N'EST PAS LE PROPRIETAIRE DU SERVICE
    if (userIdLogged !== isServiceExists[0].user.id) {
      throw new ForbiddenException('Vous ne pouvez pas réservé un service que vous proposez');
    };


    // SWITCH LA PROPRIETE "RESERVED FALSE" DU SERVICE DE FALSE A TRUE
    const updatedService = await this.servicesService.updateReserved(createReservationDto.service)

    return res.status(201).json({
      status: 'OK',
      message: 'Réservation créée',
      data: {newReservation, updatedService}
    });

  };

  @Get()
  async findAll(@Res() res: Response) {

    const reservations = await this.reservationsService.findAll();

    if (!reservations) {
      throw new BadRequestException('Aucune réservation à afficher');
    };
    
    return res.status(201).json({
      status: 'OK',
      message: 'Réservations',
      data: reservations
    });
  };

  @Get(':id')
  @Bind(Param('id', new ParseIntPipe()))
  findOne(@Param('id') id: number, @Res() res: Response) {

    const reservation = this.reservationsService.findOne(+id);

    if (!reservation) {
      throw new BadRequestException('Reservation id inconnue');
    };

    return res.status(201).json({
      status: 'OK',
      message: 'Réservation',
      data: reservation
    }); 

  };

  // NON DEMANDE AU BRIEF
  /* @Patch(':id')
  async update(@Param('id') id: string) {

    // const updated = await this.servicesService.updateReserved()

    // faire un update du service pour passer la colonne "reserved" de false à true
    return this.reservationsService.update(+id);
  };

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(+id);
  }; */

};
