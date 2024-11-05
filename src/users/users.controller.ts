import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get() // GET /users
  findAll() {
    return ['1', '2'];
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return { id };
  }

  @Post()
  create(@Body() user: {}) {
    return user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() userUpdate: {}) {
    return { id, ...userUpdate };
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return { id };
  }
}
