import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './dto/LoginUser.dto';
import { UserService } from 'src/users/users.service';
import { DatabaseService } from 'src/database/database.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}


  async signup(createUserDto: CreateUserDto) {
    createUserDto.password = await this.hashPassword(createUserDto.password);
    return await this.userService.create(createUserDto);
  }

  async login(user: LoginUserDto) {
    const usersArr = await this.dbService.user.findMany({
      where: {
        login: user.login,
      },
    });
    if (usersArr.length === 0)
      throw new HttpException(
        'no user with such login, password match actual one',
        HttpStatus.FORBIDDEN,
      );

    const promisePasswords = async (arr: User[]) => {
      const results = await Promise.all(
        arr.map((val: User) =>
          this.comparePasswords(user.password, val.password),
        ),
      );
      return arr.filter((_, idx) => results[idx]);
    };

    const matchingPasswordsArr = await promisePasswords(usersArr);
    if (matchingPasswordsArr.length === 0)
      throw new HttpException(
        'no user with such login, password match actual one',
        HttpStatus.FORBIDDEN,
      );
    const logUser = matchingPasswordsArr[0];
    const accToken = await this.generateJwt(logUser)
    return accToken;
  }

  async refresh(request) {}

  async generateJwt(user: User){
    const payload = { sub: user.id, username: user.login}
    const accToken = {
      access_token: await this.jwtService.signAsync(payload)
    }
    return accToken 
  }

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
