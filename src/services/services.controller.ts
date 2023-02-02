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
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { GetServiceDto } from './dto/get-service.dto';

@Controller('services')
export class ServicesController {
  constructor(
    private readonly servicesService: ServicesService,
    private readonly usersService: UsersService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createServiceDto: CreateServiceDto,
    @Res() res: Response,
    @Request() req,
  ) {
    const userIdLogged = req.user.id;

    const newService = await this.servicesService.create(
      userIdLogged,
      createServiceDto,
    );

    return res.status(201).json({
      status: 'SUCCESS',
      message: 'Nouveau service ajouté !',
      data: newService,
    });
  }

  @Get()
  findAll() {
    const getAll = this.servicesService.findAll();
    return getAll;
  }

  @Get('search')
  async findService(@Body() getServiceDto: GetServiceDto) {
    const service = await this.servicesService.findName(getServiceDto);
    return service;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @Bind(Param('id', new ParseIntPipe()))
  async update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
    @Res() res: Response,
    @Request() req,
  ) {
    const userIdLogged = req.user.id;
    const isUserExist = await this.usersService.findOneById(+id);

    if (!isUserExist) {
      throw new BadRequestException('User id inconnu');
    }
    const updateService = await this.servicesService.update(
      userIdLogged,
      updateServiceDto,
    );
    return res.status(201).json({
      status: 'SUCCESS',
      message: 'Service modifié',
      data: updateService,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @Bind(Param('id', new ParseIntPipe()))
  async remove(@Param('id') id: string, @Res() res: Response) {
    const isUserExist = await this.usersService.findOneById(+id);

    if (!isUserExist) {
      throw new BadRequestException('User id inconnu');
    }
    const deleteService = await this.servicesService.remove(+id);
    if (!deleteService) {
      throw new BadRequestException('Service ID inconnu');
    }
    return res.status(201).json({
      status: 'SUCCESS',
      message: 'Service Supprimé',
      data: deleteService,
    });
  }
}
