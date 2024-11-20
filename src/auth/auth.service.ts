import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  hashPassword(password: string): Observable<string> {
    return from(bcrypt.hash(password, process.env.CRYPT_SALT));
  }

  comparePasswords(password: string, oldPasswordHash: string): Observable<any> {
    return from(bcrypt.compare(password, oldPasswordHash));
  }
}
