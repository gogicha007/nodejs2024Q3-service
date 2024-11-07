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
  import { ArtistsService } from './artists.service';
  import { CreateArtistDto } from './dto/create-artist.dto';
  import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistsController {
    constructor(private readonly artistsService: ArtistsService) {}

    @Get()
    findAll() {
      return this.artistsService.findAll();
    }
  
    @Get(':id')
    findOnde(@Param('id', ParseUUIDPipe) id: string) {
      return this.artistsService.findOne(id);
    }
  
    @Post()
    createTrack(@Body(ValidationPipe) createTrack: CreateArtistDto) {
      return this.artistsService.createArtist(createTrack);
    }
  
    @Put(':id')
    updateTrack(
      @Param('id', ParseUUIDPipe) id: string,
      @Body(ValidationPipe) updateTrack: UpdateArtistDto,
    ) {
      return this.artistsService.updateArtist(id, updateTrack);
    }
  
    @Delete(':id')
    @HttpCode(204)
    deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
      return this.artistsService.deleteArtist(id);
    }
}
