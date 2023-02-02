import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
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

  findAll() {
    return `This action returns all services`;
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  async update(userIdLogged: number, updateServiceDto: UpdateServiceDto) {
    const servicesToUpdate = await Service.findOneBy({
      id: userIdLogged,
    });
    servicesToUpdate.name = updateServiceDto.name;
    servicesToUpdate.price = updateServiceDto.price;
    servicesToUpdate.city = updateServiceDto.city;
    servicesToUpdate.start_time = updateServiceDto.start_time;
    servicesToUpdate.end_time = updateServiceDto.end_time;

    await Service.save(servicesToUpdate);

    if (servicesToUpdate) {
      return await Service.findOneBy({
        id: userIdLogged,
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
