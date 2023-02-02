import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
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
  };

  async findAll() {
    return `This action returns all users`;
  };

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  };

  async findOneByUsernameWithPassword(username: string) {
    const user = await User.findOne({ // permet de contourner le "select: false" du password (pour la phase de login)
      where: { username: username },
      select: ["id", "username", "password"]
    });

    if (user) {
      return user;
    };

    return undefined;
  };

  async findOneByUsername(username: string) {
    const user = await User.findOneBy({username: username});

    if (user) {
      return user;
    };
    return undefined;
  };
  
  async findOneByEmail(e_mail: string) {
    const user = await User.findOneBy({e_mail: e_mail});

    if (user) {
      return user;
    };
    return undefined;
  };

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  };

  async remove(id: number) {
    return `This action removes a #${id} user`;
  };

};
