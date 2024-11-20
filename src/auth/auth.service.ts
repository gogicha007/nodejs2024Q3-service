import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    createUserDto.password = await this.hashPassword(createUserDto.password)
    return await this.userService.create(createUserDto);
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(+process.env.CRYPT_SALT)
    const hashedPass = await bcrypt.hash(password, salt);
    return hashedPass
  }

  comparePasswords(password: string, oldPasswordHash: string): Observable<any> {
    return from(bcrypt.compare(password, oldPasswordHash));
  }
}
