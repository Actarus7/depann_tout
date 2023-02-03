import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guards';
import { LocalAuthGuard } from './guards/local-auth.guards';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(/* @Body() loginUserDto: LoginUserDto */ @Request() req) {
    // typage de req ?

    const user = await this.authService.login(/* loginUserDto */ req.user);
    // console.log(user);

    return user;
  };

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.usersService.findOneByUsername(req.user.username);
 
    return user;
  };
};