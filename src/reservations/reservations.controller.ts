import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Res, BadRequestException } from '@nestjs/common';
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
    private readonly servicesService: ServicesService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createReservationDto: CreateReservationDto, @Request() req, @Res() res: Response) {

    // VERIFIE SI LE SERVICE RESERVE EXISTE
    const isServiceExists = await this.servicesService.findOne(createReservationDto.service)

    if (!isServiceExists) {
      throw new BadRequestException("Le service demandé n'existe pas");
    };


    // RECUPERE LE USER ID DU USER CONNECTE
    const userIdLogged = req.user.id;


    // GENERE UN RANDOM ALEATOIRE ET VERIFIE QU'IL N'EXISTE PAS DEJA DANS LA BASE DE DONNEE
    const numeroExistants = await this.reservationsService.findAllNumbers();

    // console.log(numeroExistants);
    
    const numero = Math.floor(Math.random()*10000);


    const newReservation = await this.reservationsService.create(createReservationDto, numero, userIdLogged);

    return res.status(201).json({
      status: 'OK',
      message: 'Réservation créée',
      data: newReservation
    });

 };

  @Get()
  findAll() {
    return this.reservationsService.findAll();
  };

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(+id);
  };

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationsService.update(+id, updateReservationDto);
  };

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(+id);
  };

};
 