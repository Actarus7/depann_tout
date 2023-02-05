import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
  Res,
  Request,
  BadRequestException,
  UseGuards,
  ForbiddenException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { FindOneParams } from './dto/findOne-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // CREATION D'UN NOUVEAU USER
  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() createUserDto: CreateUserDto) {

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
    createUserDto.password = hash;

    // CREATION D'UN NOUVEAU USER
    const user = await this.usersService.create(createUserDto);

    return user;
  };


  // RECUPERATION DES TOUS LES USERS
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll() {
    const users = await this.usersService.findAll();

    if (!users) {
      throw new BadRequestException('Aucun user à afficher');
    }

    return users;
  };


  // RECUPERATION D'UN USER PAR ID
  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Param() params: FindOneParams) {
    const user = await this.usersService.findOneById(+params.id);

    if (!user) {
      throw new BadRequestException('User id inconnu');
    };

    return user;
  };
};



// NON DEMANDE
  // MODIFIER UN USER
/* @UseGuards(JwtAuthGuard)
// @Bind(Param('id'), new ParseIntPipe())
@Patch(':id')
@UseInterceptors(ClassSerializerInterceptor)
async update(
  @Param() params: FindOneParams,
  @Body() updateUserDto: UpdateUserDto,
  @Request() req,
  @Res() res: Response,
) {
  const userLogged = req.user;

  const isUser = await this.usersService.findOneById(+params.id);

  if (!isUser) {
    throw new BadRequestException('User inconnu');
  }

  if (userLogged.id !== isUser.id) {
    throw new ForbiddenException("Vous n'êtes pas le User à modifier");
  }

  const updatedUser = await this.usersService.update(
    +params.id,
    updateUserDto,
  );

  return res.status(200).json({
    status: 'OK',
    message: 'User modifié',
    data: updatedUser,
  });
} */

  // SUPPRIMER UN USER
/* @UseGuards(JwtAuthGuard)
@Delete(':id')
@UseInterceptors(ClassSerializerInterceptor)
async remove(
  @Param() params: FindOneParams,
  @Request() req,
  @Res() res: Response,
) {
  const userLogged = req.user;

  const isUser = await this.usersService.findOneById(+params.id);

  if (!isUser) {
    throw new BadRequestException('User inconnu');
  }

  if (userLogged.id !== isUser.id && !userLogged.admin) {
    throw new ForbiddenException(
      "Vous n'êtes pas admin ou le User à modifier",
    );
  }

  const deletedUser = await this.usersService.remove(+params.id);

  return res.status(200).json({
    status: 'OK',
    message: 'User supprimé',
    data: deletedUser,
  });
} */

