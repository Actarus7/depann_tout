import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { Like } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { GetServiceDto } from './dto/get-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';

@Injectable()
export class ServicesService {
  // CREATION D'UN NOUVEAU SERVICE
  async create(userIdLogged: User, createServiceDto: CreateServiceDto) {
    const newService = new Service();
    newService.name = createServiceDto.name;
    newService.price = createServiceDto.price;
    newService.city = createServiceDto.city;
    newService.start_time = createServiceDto.start_time;
    newService.end_time = createServiceDto.end_time;
    newService.user = userIdLogged;

    newService.save();

    if (newService) {
      return newService;
    };
    return undefined;
  };

  // RECUPERE TOUS LES SERVICES (qui en sont pas réservés)
  async findAll() {
    const services = await Service.find({
      relations: { user: true },
      select: { user: { username: true } },
      where: { reserved: false },
    });

    if (services) {
      return services;
    }

    return undefined;
  };

  // RECUPERE UN SERVICE PAR SON ID (non réservé)
  async findOneReservedFalse(id: number) {
    const service = await Service.find({
      relations: { user: true },
      select: { user: { username: true, id: true } },
      where: { id, reserved: false },
    });

    if (service) {
      return service;
    };

    return undefined;
  };

  // RECUPERE UN SERVICE PAR SON ID (réservé ou non)
  async findOne(id: number) {
    const service = await Service.find({
      relations: { user: true },
      select: { user: { username: true, id: true } },
      where: { id },
    });

    if (service) {
      return service;
    };

    return undefined;
  };

  // RECUPERE UN SERVICE PAR MOT CLE (non réservé)
  async findName(getServiceDto: GetServiceDto) {
    const findServices = await Service.find({
      relations: { user: true },
      select: { user: { username: true } },
      where: { name: Like(`%${getServiceDto.name}%`), reserved: false },
    });

    if (findServices) {
      return findServices;
    }
    return undefined;
  };

  // MODIFIE UN SERVICE
  async update(id: number, updateServiceDto: UpdateServiceDto) {
    const servicesToUpdate = await Service.findOneBy({
      id: id,
    });
    servicesToUpdate.name = updateServiceDto.name;
    servicesToUpdate.price = updateServiceDto.price;
    servicesToUpdate.city = updateServiceDto.city;
    servicesToUpdate.start_time = updateServiceDto.start_time;
    servicesToUpdate.end_time = updateServiceDto.end_time;

    await Service.save(servicesToUpdate);

    if (servicesToUpdate) {
      return await Service.findOneBy({
        id: id,
      });
    }
    return undefined;
  };

  // MODIFIE UN SERVICE NON RESERVE EN RESERVE (suite création d'une réservation)
  async updateReserved(id: number) {
    const service = await Service.findOneBy({ id: id });
    service.reserved = true;

    const updatedService = await Service.update(id, service);

    if (updatedService) {
      return await Service.findOneBy({ id: id });
    };

    return undefined;
  };

  // SUPPRIME UN SERVICE
  async remove(id: number) {
    const serviceToRemove = await Service.findOneBy({
      id: id,
    });

    if (serviceToRemove) {
      return await Service.remove(serviceToRemove);
    };
    
    return undefined;
  };
};
