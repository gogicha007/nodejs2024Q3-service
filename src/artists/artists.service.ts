import { NotFoundException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  private artists = [];

  findAll() {
    return this.artists;
  }

  findOne(id: string) {
    const track = this.artists.find((track) => track.id === id);
    if (!track) throw new NotFoundException('Track not found');
    return track;
  }

  createArtist(createArtist: CreateArtistDto) {
    const id = uuidv4();
    const newTrack = {
      id: id,
      name: createArtist.name,
      grammy: createArtist.grammy,
    };
    this.artists.push(newTrack);
    return newTrack;
  }

  updateArtist(id: string, updateArtist: UpdateArtistDto) {
    const trackIdx = this.artists.findIndex((track) => track.id === id);
    if (trackIdx === -1) throw new NotFoundException('Track not found');
    this.artists[trackIdx] = {
      ...this.artists[trackIdx],
      ...updateArtist,
    };
    return this.findOne(id);
  }

  deleteArtist(id: string) {
    const removedArtist = this.findOne(id);
    if (!removedArtist) throw new NotFoundException('Track not found');
    this.artists = this.artists.filter((track) => track.id !== id);
    return removedArtist;
  }
}
