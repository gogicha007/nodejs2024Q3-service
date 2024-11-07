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
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

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
    return this.trackServise.createTrack(createTrack);
  }

  @Put()
  updateTrack(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateTrack: UpdateTrackDto,
  ) {
    return this.trackServise.updateTrack(id, updateTrack);
  }

  @Delete()
  deleteTrack() {
    return 'delete track';
  }
}
