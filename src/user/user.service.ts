import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDro } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private users = [];

  findAll() {
    console.log('get')
    return this.users;
  }

  findOne(id: string) {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  create(createUser: CreateUserDto) {
    const id = uuidv4();
    const newUser = {
      id: id,
      login: createUser.login,
      password: createUser.password,
      version: 0,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: string, updatedUser: UpdateUserDro) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...updatedUser,
          version: user.version++,
          updatedAt: new Date().getTime(),
        };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: string) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
