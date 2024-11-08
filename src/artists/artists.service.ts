import { NotFoundException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ArtistsService {
  constructor(private readonly dbService: DatabaseService) {}

  // private artists = [];

  findAll() {
    console.log(this.dbService.data);
    return this.dbService.data.artists;
  }

  findOne(id: string) {
    const track = this.dbService.data.artists.find((track) => track.id === id);
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
    this.dbService.data.artists.push(newTrack);
    return newTrack;
  }

  updateArtist(id: string, updateArtist: UpdateArtistDto) {
    const artistIdx = this.dbService.data.artists.findIndex(
      (track) => track.id === id,
    );
    if (artistIdx === -1) throw new NotFoundException('Artist not found');
    this.dbService.data.artists[artistIdx] = {
      ...this.dbService.data.artists[artistIdx],
      ...updateArtist,
    };
    return this.findOne(id);
  }

  deleteArtist(id: string) {
    const removedArtist = this.findOne(id);
    if (!removedArtist) throw new NotFoundException('Artist not found');
    this.dbService.data.artists = this.dbService.data.artists.filter(
      (artist) => artist.id !== id,
    );
    this.dbService.data.tracks.map((track) => {
      if (track.artistId === removedArtist.id) track.artistId = null;
    });
    return removedArtist;
  }
}
