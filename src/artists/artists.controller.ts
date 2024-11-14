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
  import { Prisma } from '@prisma/client';
  import { ArtistsService } from './artists.service';

@Controller('artist')
export class ArtistsController {
    constructor(private readonly artistsService: ArtistsService) {}

    @Post()
    createTrack(@Body(ValidationPipe) createTrack: Prisma.ArtistCreateInput) {
      return this.artistsService.createArtist(createTrack);
    }

    @Get()
    findAll() {
      return this.artistsService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
      return this.artistsService.findOne(id);
    }
    
    @Put(':id')
    updateTrack(
      @Param('id', ParseUUIDPipe) id: string,
      @Body(ValidationPipe) updateTrack: Prisma.ArtistUpdateInput,
    ) {
      return this.artistsService.updateArtist(id, updateTrack);
    }
  
    @Delete(':id')
    @HttpCode(204)
    deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
      return this.artistsService.deleteArtist(id);
    }
}
