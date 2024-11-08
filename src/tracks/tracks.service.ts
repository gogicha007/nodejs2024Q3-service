import { NotFoundException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TracksService {
  constructor(private readonly dbService: DatabaseService) {}

  // private tracks = [];

  findAll() {
    console.log(this.dbService.data);
    return this.dbService.data.tracks;
  }

  findOne(id: string) {
    const track = this.dbService.data.tracks.find((track) => track.id === id);
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
    this.dbService.data.tracks.push(newTrack);
    return newTrack;
  }

  updateTrack(id: string, updateTrack: UpdateTrackDto) {
    const trackIdx = this.dbService.data.tracks.findIndex(
      (track) => track.id === id,
    );
    if (trackIdx === -1) throw new NotFoundException('Track not found');
    this.dbService.data.tracks[trackIdx] = {
      ...this.dbService.data.tracks[trackIdx],
      ...updateTrack,
    };
    return this.findOne(id);
  }

  deleteTrack(id: string) {
    const removedTrack = this.findOne(id);
    if (!removedTrack) throw new NotFoundException('Track not found');
    this.dbService.data.tracks = this.dbService.data.tracks.filter(
      (track) => track.id !== id,
    );
    return removedTrack;
  }
}
