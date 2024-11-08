import { Injectable, NotFoundException} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly dbService: DatabaseService) {}

  getAllFavs() {
    return this.dbService.data.favorites;
  }

  addTrack(id: string) {
    const track = this.dbService.data.tracks.find((track) => track.id === id);
    if (!track) throw new NotFoundException('Track not found');
    return 'add track';
  }

  removeTrack(id: string) {
    return 'remove track';
  }

  addAlbum(id: string) {
    const album = this.dbService.data.albums.find((album) => album.id === id);
    if (!album) throw new NotFoundException('Album not found');
    return 'add album';
  }

  removeAlbum(id: string) {
    return 'remove album';
  }

  addArtist(id: string) {
    const artist = this.dbService.data.artists.find((artist) => artist.id === id);
    if (!artist) throw new NotFoundException('Artist not found');
    return 'add artist';
  }

  removeArtist(id: string) {
    return 'remove artist';
  }
}
