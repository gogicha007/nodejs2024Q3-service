import {
  HttpException,
  HttpStatus,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  private tracks = [];

  findAll() {
    return this.tracks;
  }

  findOne(id: string) {
    const track = this.tracks.find((track) => track.id === id);
    if (!track) throw new NotFoundException('Track not found');
    return track;
  }

  createTrack(createTrack: CreateTrackDto) {
    const id = uuidv4();
    const newTrack = {
      id: id,
      name: createTrack.name,
      artistId: createTrack.artistId ? createTrack.artistId : null,
      albumId: createTrack.albumId ? createTrack.albumId : null,
      duration: createTrack.duration,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  updateTrack(id: string, updateTrack: UpdateTrackDto) {
    const trackIdx = this.tracks.findIndex((track) => track.id === id);
    if (trackIdx === -1) throw new NotFoundException('Track not found');
    this.tracks[trackIdx] = {
      ...this.tracks[trackIdx],
      ...updateTrack,
    };
    return this.findOne(id)
  }

  deleteTrack(id: string){
    return 'delete track'
  }
}
