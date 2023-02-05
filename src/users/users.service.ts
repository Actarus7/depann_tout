import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  /* // CREATION D'UN NOUVEAU USER - ALTERNATIVE 1
  async create(createUserDto: CreateUserDto, hash: string) {
    const newUser = new User();
    newUser.username = createUserDto.username;
    newUser.e_mail = createUserDto.e_mail;
    newUser.password = hash;
    newUser.adress_line1 = createUserDto.adress_line1;
    newUser.adress_line2 = createUserDto.adress_line2;
    newUser.adress_line3 = createUserDto.adress_line3;
    newUser.zipCode = createUserDto.zipCode;
    newUser.city = createUserDto.city;

    await newUser.save();

    return newUser; 
  }; */

  // CREATION D'UN NOUVEAU USER - ALTERNATIVE 2
  async create(createUserDto: CreateUserDto) {
    const newUser = await User.create(createUserDto).save();
    return newUser;
  };

  // RECUPERE TOUS LES USERS
  async findAll() {
    const users = await User.find();

    if (users) {
      return users;
    };

    return undefined;
  };

  // RECUPERE UN USER PAR SON ID
  async findOneById(id: number) {
    const user = await User.findOneBy({ id: id });

    if (user) {
      return user;
    };

    return undefined;
  };

  // RECUPERE UN USER PAR SON USERNAME (avec password)
  async findOneByUsernameWithPassword(username: string) {
    const user = await User.findOne({
      // permet de contourner le "select: false" du password (pour la phase de login)
      where: { username: username },
    });

    if (user) {
      return user;
    };

    return undefined;
  };

  // RECUPERE UN USER PAR SON USERNAME
  async findOneByUsername(username: string) {
    const user = await User.findOneBy({ username: username });

    if (user) {
      return user;
    }
    return undefined;
  };

  // RECUPERE UN USER PAR SON EMAIL
  async findOneByEmail(e_mail: string) {
    const user = await User.findOneBy({ e_mail: e_mail });

    if (user) {
      return user;
    };

    return undefined;
  };
};


// NON DEMANDE
/* // MODIFIE UN USER
async update(id: number, updateUserDto: UpdateUserDto) {
  if (updateUserDto.password) {
    const hash = await bcrypt.hash(updateUserDto.password, 10);

    updateUserDto.password = hash;
  };

  const updateUser = await User.update(+id, updateUserDto);

  if (updateUser) {
    return await User.findOneBy({ id: id });
  };

  return undefined;
};

// SUPPRIME UN USER
async remove(id: number) {
  const deletedUser = await User.findOneBy({ id: id });
  deletedUser.remove();

  if (deletedUser) {
    return deletedUser;
  };

  return undefined;
}; */

