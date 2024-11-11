import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';


@Injectable()
export class UserService {
  private users = [];

  findAll() {
    const result = this.users.map(user=>{
      const userCopy = JSON.parse(JSON.stringify(user))
      delete userCopy.password
      return userCopy
    })
    console.log(this.users)
    return result;
  }

  findOne(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found');
    const res = {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
    return res;
  }

  create(createUser: CreateUserDto) {
    const id = uuidv4();
    const newUser = {
      id: id,
      login: createUser.login,
      password: createUser.password,
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };
    this.users.push(newUser);
    const res = {
      id: id,
      login: newUser.login,
      version: newUser.version,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt
    }
    return res;
  }

  update(id: string, updatedPassword: UpdatePasswordDto) {
    const userIdx = this.users.findIndex((user) => user.id === id);
    if (userIdx === -1) throw new NotFoundException('User not found');
    if (this.users[userIdx].password !== updatedPassword.oldPassword)
      throw new HttpException('Old password is wrong', HttpStatus.FORBIDDEN);

    this.users[userIdx].password = updatedPassword.newPassword
    this.users[userIdx].version++
    this.users[userIdx].updatedAt = new Date().getTime()

    return this.findOne(id);
  }

  delete(id: string) {
    const removedUser = this.findOne(id);
    if (!removedUser) throw new NotFoundException('User not found');
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
