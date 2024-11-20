import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserService } from 'src/users/users.service';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthService {
  constructor(private readonly dbService: DatabaseService,private readonly userService: UserService) {}

  async signup(createUserDto: CreateUserDto) {
    
    createUserDto.password = await this.hashPassword(createUserDto.password);
    return await this.userService.create(createUserDto);
  }

  async login(body: { login: string; password: string }) {
    console.log(body.login);
    const userExist = await this.dbService.user.findUnique({
        where: {
            login: body.login
        }
    })
    if(userExist) console.log(userExist)
    return body;
  }

  async refresh(request) {}

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(+process.env.CRYPT_SALT);
    const hashedPass = await bcrypt.hash(password, salt);
    return hashedPass;
  }

  async comparePasswords(password: string, storedPasswordHash: string) {
    const result = await bcrypt.compare(password, storedPasswordHash);
    return result;
  }
}
