import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
  ValidationPipe,
  HttpCode
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body(ValidationPipe) createUser: CreateUserDto) {
    return this.userService.create(createUser);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateUser: UpdatePasswordDto,
  ) {
    return this.userService.update(id, updateUser);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.delete(id);
  }
}