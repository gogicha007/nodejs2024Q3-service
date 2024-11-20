import { Body, Controller, Post, HttpCode, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

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
  async login(@Req() req: Request) {
    return await this.authService.login(req.body);
  }

  @Post('refresh')
  @HttpCode(200)
  async refresh(@Req() req: Request) {
    return await this.authService.refresh(req.body);
  }
}
