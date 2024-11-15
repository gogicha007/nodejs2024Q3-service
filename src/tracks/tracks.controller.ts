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
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TracksController {
  constructor(private readonly trackServise: TracksService) {}

  @Post()
  createTrack(@Body(ValidationPipe) createTrack: CreateTrackDto) {
    return this.trackServise.createTrack(createTrack);
  }

  @Get()
  findAll() {
    return this.trackServise.findAll();
  }

  @Get(':id')
  findOnde(@Param('id', ParseUUIDPipe) id: string) {
    return this.trackServise.findOne(id);
  }


  @Put(':id')
  updateTrack(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateTrack: UpdateTrackDto,
  ) {
    return this.trackServise.updateTrack(id, updateTrack);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.trackServise.deleteTrack(id);
  }
}
