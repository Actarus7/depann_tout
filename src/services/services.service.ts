import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';

@Injectable()
export class ServicesService {
  create(createServiceDto: CreateServiceDto) {
    const newService = new Service();
    newService.name = createServiceDto.name;
    newService.price = createServiceDto.price;
    newService.city = createServiceDto.city;
    newService.start_time = createServiceDto.start_time;
    newService.end_time = createServiceDto.end_time;

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

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
