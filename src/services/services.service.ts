import { Injectable } from '@nestjs/common';
import { identity } from 'rxjs';
import { Like } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { GetServiceDto } from './dto/get-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';

@Injectable()
export class ServicesService {
  create(userIdLogged, createServiceDto: CreateServiceDto) {
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
    }
    return undefined;
  }

  async findAll() {
    const services = await Service.findBy({ reserved: false });

    if (services) {
      return services;
    }

    return undefined;
  }

  async findOne(id: number) {
    const service = await Service.findOneBy({ id, reserved: false });

    if (service) {
      return service;
    }

    return undefined;
  }

  async findName(getServiceDto: GetServiceDto) {
    const findServices = await Service.findBy({
      name: Like(`%${getServiceDto.name}%`),
      reserved: false,
    });

    if (findServices) {
      return findServices;
    }
    return undefined;
  }

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
  }

  async remove(id: number) {
    const serviceToRemove = await Service.findOneBy({
      id: id,
    });
    if (serviceToRemove) {
      return await Service.remove(serviceToRemove);
    }
    return undefined;
  }
}
