import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByUsernameWithPassword(username);

        const isMatch = await bcrypt.compare(pass, user.password);

        if (isMatch) {
            const { password, ...result } = user;
            return result;
        };

        throw new ForbiddenException('Password incorrect');
    };

    async login(/* loginUserDto: any */user: any) {
        // console.log(user);

        const payload = { /* username: loginUserDto.username, sub: loginUserDto.id, admin: loginUserDto.admin */username: user.username, sub: user.id, admin: user.admin };
        // console.log(payload);


        return { id: payload.sub, username: payload.username, access_token: this.jwtService.sign(payload), admin: payload.admin }
    };

};