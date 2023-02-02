import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, Res, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {

    // VERIFIE SI LE USERNAME EST DEJA EXISTANT
    const saltOrRounds = 10;
    
    const isUsernameExists = await this.usersService.findOneByUsername(createUserDto.username);

    if (isUsernameExists) {
      throw new ConflictException('Username déjà existant, choisissez-en un autre');
    };


    // VERIFIE SI L'EMAIL EST DEJA EXISTANT
    const isEmailExists = await this.usersService.findOneByEmail(createUserDto.e_mail);

    if (isEmailExists) {
      throw new ConflictException('Username déjà existant, choisissez-en un autre');
    };


    // VERIFIE LE PASSWORD ET LA CONFIRMATION PASSWORD
    if (createUserDto.password !== createUserDto.confirm_password) {
      throw new BadRequestException('Le password et la confirmation password ne sont pas identiques');
    };


    // HASHAGE DU PASSWORD
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);

    
    // CREATION D'UN NOUVEAU USER
    const newUser = await this.usersService.create(createUserDto, hash);

    return res.status(201).json({
      status: 'OK',
      message: 'User créé',
      data: newUser
    });

  };

  @Get()
  findAll() {
    return this.usersService.findAll();
  };

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  };

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  };

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  };

};
