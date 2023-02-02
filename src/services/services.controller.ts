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
    return this.servicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(+id);
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
    const isUserExist = await this.usersService.findOne(+id);

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
    const isUserExist = await this.usersService.findOne(+id);

    if (!isUserExist) {
      throw new BadRequestException('User id inconnu');
    }
    const deleteService = await this.servicesService.remove(+id);
    return res.status(201).json({
      status: 'SUCCESS',
      message: 'Service modifié',
      data: deleteService,
    });
  }
}
