import { NotFoundException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class ArtistsService {
  private artists = [];

  findAll() {
    console.log()
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
    const artistIdx = this.artists.findIndex((track) => track.id === id);
    if (artistIdx === -1) throw new NotFoundException('Artist not found');
    this.artists[artistIdx] = {
      ...this.artists[artistIdx],
      ...updateArtist,
    };
    return this.findOne(id);
  }

  deleteArtist(id: string) {
    const removedArtist = this.findOne(id);
    if (!removedArtist) throw new NotFoundException('Artist not found');
    this.artists = this.artists.filter((track) => track.id !== id);

    return removedArtist;
  }
}
