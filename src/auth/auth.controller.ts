import {
  Body,
  Controller,
  Post,
  HttpCode,
  Req,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Request } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './dto/LoginUser.dto';
import { AuthService } from './auth.service';
import { RefreshTokenGuard } from './guards/refresh-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signup(createUserDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body(ValidationPipe) loginUser: LoginUserDto) {
    return await this.authService.login(loginUser);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(200)
  async refresh(@Req() {user, body}: Request) {
    console.log(user)
    return await this.authService.refresh(user['sub'], body.refreshToken);
  }
}
