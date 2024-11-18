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
    HttpCode,
  } from '@nestjs/common';
  import { AlbumsService } from './albums.service';
  import { CreateAlbumDto } from './dto/create-album.dto';
  import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumsController {
    constructor(private readonly albumsService: AlbumsService) {}

    @Get()
    findAll() {
      return this.albumsService.findAll();
    }
  
    @Get(':id')
    findOnde(@Param('id', ParseUUIDPipe) id: string) {
      return this.albumsService.findOne(id);
    }
  
    @Post()
    createAlbum(@Body(ValidationPipe) createAlbum: CreateAlbumDto) {
      return this.albumsService.createAlbum(createAlbum);
    }
  
    @Put(':id')
    updateAlbum(
      @Param('id', ParseUUIDPipe) id: string,
      @Body(ValidationPipe) updateAlbum: UpdateAlbumDto,
    ) {
      return this.albumsService.updateAlbum(id, updateAlbum);
    }
  
    @Delete(':id')
    @HttpCode(204)
    deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
      return this.albumsService.deleteAlbum(id);
    }

}
