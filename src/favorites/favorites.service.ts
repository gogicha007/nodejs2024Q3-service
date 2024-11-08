import { Injectable, NotFoundException, UnprocessableEntityException} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly dbService: DatabaseService) {}

  getAllFavs() {
    return this.dbService.data.favorites;
  }

  addTrack(id: string) {
    const track = this.dbService.data.tracks.find((track) => track.id === id);
    if (!track) throw new UnprocessableEntityException('Track not found');
    this.dbService.data.favorites.tracks.push(track)
    return track;
  }

  removeTrack(id: string) {
    return 'remove track';
  }

  addAlbum(id: string) {
    const album = this.dbService.data.albums.find((album) => album.id === id);
    if (!album) throw new UnprocessableEntityException('Album not found');
    this.dbService.data.favorites.albums.push(album)
    return album;
  }

  removeAlbum(id: string) {
    return 'remove album';
  }

  addArtist(id: string) {
    const artist = this.dbService.data.artists.find((artist) => artist.id === id);
    if (!artist) throw new UnprocessableEntityException('Artist not found');
    this.dbService.data.favorites.artists.push(artist)
    return artist;
  }

  removeArtist(id: string) {
    return 'remove artist';
  }
}
