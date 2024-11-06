import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';


@Controller('user')
export class UserController {

  constructor(private readonly usersService: UserService){

  }

  @Get() // GET /users
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() user: {login: string, password: string}) {
    console.log(user);
    return this.usersService.create(user);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() userUpdate: {login?: string, password?:string}) {
    return this.usersService.update(id, userUpdate);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return { id };
  }
}
