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
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';

@Controller('track')
export class TracksController {
  constructor(private readonly trackServise: TracksService) {}

  @Get()
  findAll() {
    return this.trackServise.findAll();
  }

  @Get(':id')
  findOnde(@Param('id', ParseUUIDPipe) id: string) {
    return this.trackServise.findOne(id);
  }

  @Post()
  createTrack(@Body(ValidationPipe) createTrack: CreateTrackDto) {
    return this.createTrack(createTrack);
  }

  @Put()
  updateTrack() {
    return 'update track';
  }

  @Delete()
  deleteTrack() {
    return 'delete track';
  }
}
