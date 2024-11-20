import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('signup')
    @HttpCode(201)
    async signup(@Body() createUserDto: CreateUserDto){
        return await this.authService.signup(createUserDto)
    }

    

}
