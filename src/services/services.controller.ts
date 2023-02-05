import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  BadRequestException,
  ParseIntPipe,
  Bind,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { UsersService } from 'src/users/users.service';
import { GetServiceDto } from './dto/get-service.dto';
import { ReservationsService } from 'src/reservations/reservations.service';

@Controller('services')
export class ServicesController {
  constructor(
    private readonly servicesService: ServicesService,
    private readonly usersService: UsersService,
    private readonly reservationsService: ReservationsService,
  ) { }

  // CREATION D'UN NOUVEAU SERVICE (Nécessite d'être enregistré/connecté)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createServiceDto: CreateServiceDto,
    @Request() req,
  ) {
    // RECUPERE LE USER ID CONNECTE
    const userIdLogged = req.user.id;

    // CREATION DU NOUVEAU SERVICE
    const newService = await this.servicesService.create(userIdLogged, createServiceDto);

    return newService;
  };


  // RECUPERATION DE TOUS LES SERVICES (Non Réservés)
  @Get()
  findAll() {
    const getAll = this.servicesService.findAll();
    return getAll;
  };


  // RECUPERATION DE SERVICES (Non Réservés) PAR MOT CLE
  @Get('search')
  async findService(@Body() getServiceDto: GetServiceDto) {
    const service = await this.servicesService.findName(getServiceDto);
    return service;
  };


  // MODIFICATION D'UN SERVICE (Nécessite d'être enregistré/connecté ET d'être propriétaire du service concerné)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @Bind(Param('id', new ParseIntPipe()))
  async update(
    @Param('id') id: number,
    @Body() updateServiceDto: UpdateServiceDto) {
    const isServiceExist = await this.servicesService.findOne(+id);

    if (!isServiceExist) {
      throw new BadRequestException('Service id inconnu');
    };
    const updateService = await this.servicesService.update(
      id,
      updateServiceDto,
    );
    return updateService;
  };


  // SUPPRESSION D'UN SERVICE (Nécessite d'être enregistré/connecté ET titulaire du service concerné)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @Bind(Param('id', new ParseIntPipe()))
  async remove(@Param('id') id: string, @Request() req) {

    // VERIFIE SUR LE SERVICE EXISTE
    const isServiceExists = await this.servicesService.findOne(+id);

    if (isServiceExists.length < 1) {
      throw new BadRequestException('Service ID inconnu');
    };


    // VERIFIE SI LE USER CONNECTE EST LE PROPRIETAIRE DU SERVICE
    const userIdLogged = req.user.id;

    if (userIdLogged !== isServiceExists[0].user.id) {
      throw new ForbiddenException("Vous n'êtes pas titulaire de ce service")
    };


    // SUPPRIME LA RESERVATION ASSOCIEE AU SERVICE S'IL Y EN A UNE
    console.log('booléen du service si réservé', isServiceExists[0].reserved);

    if (isServiceExists[0].reserved) {
      // Récupère l'id de la réservation associée
      const reservation = await this.reservationsService.findOneByServiceId(id);
      // Supprime la réservation associée
      await reservation.remove();
    };


    // SUPPRIME LE SERVICE CONCERNE
    const deleteService = await this.servicesService.remove(+id);

    return deleteService;
  };
};
