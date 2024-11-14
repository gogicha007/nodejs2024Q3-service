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
  import { Prisma } from '@prisma/client';
  import { AlbumsService } from './albums.service';

@Controller('album')
export class AlbumsController {
    constructor(private readonly albumsService: AlbumsService) {}

    @Post()
    createAlbum(@Body(ValidationPipe) createAlbum: Prisma.AlbumCreateInput) {
      return this.albumsService.createAlbum(createAlbum);
    }

    @Get()
    findAll() {
      return this.albumsService.findAll();
    }
  
    @Get(':id')
    findOnde(@Param('id', ParseUUIDPipe) id: string) {
      return this.albumsService.findOne(id);
    }
  
    @Put(':id')
    updateAlbum(
      @Param('id', ParseUUIDPipe) id: string,
      @Body(ValidationPipe) updateAlbum: Prisma.AlbumUpdateInput,
    ) {
      return this.albumsService.updateAlbum(id, updateAlbum);
    }
  
    @Delete(':id')
    @HttpCode(204)
    deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
      return this.albumsService.deleteAlbum(id);
    }

}
