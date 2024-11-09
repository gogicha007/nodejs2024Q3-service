import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly dbService: DatabaseService) {}

  getAllFavs() {
    return this.dbService.data.favorites;
  }

  addTrack(id: string) {
    const trackToAdd = this.dbService.data.tracks.find(
      (track) => track.id === id,
    );
    if (!trackToAdd) throw new UnprocessableEntityException('Track not found');
    this.dbService.data.favorites.tracks.push(trackToAdd);
    return trackToAdd;
  }

  removeTrack(id: string) {
    const trackToRemove = this.dbService.data.favorites.tracks.find(
      (track) => track.id === id,
    );
    if (!trackToRemove) throw new NotFoundException('Track not found');
    this.dbService.data.favorites.tracks =
      this.dbService.data.favorites.tracks.filter((track) => track.id !== id);
    return trackToRemove;
  }

  addAlbum(id: string) {
    const albumToAdd = this.dbService.data.albums.find(
      (album) => album.id === id,
    );
    if (!albumToAdd) throw new UnprocessableEntityException('Album not found');
    this.dbService.data.favorites.albums.push(albumToAdd);
    return albumToAdd;
  }

  removeAlbum(id: string) {
    const albumToRemove = this.dbService.data.favorites.albums.find(
      (album) => album.id === id,
    );
    if (!albumToRemove) throw new NotFoundException('Track not found');
    this.dbService.data.favorites.albums =
      this.dbService.data.favorites.albums.filter((album) => album.id !== id);
    return albumToRemove;
  }

  addArtist(id: string) {
    const artist = this.dbService.data.artists.find(
      (artist) => artist.id === id,
    );
    if (!artist) throw new UnprocessableEntityException('Artist not found');
    this.dbService.data.favorites.artists.push(artist);
    return artist;
  }

  removeArtist(id: string) {
    const artistToRemove = this.dbService.data.favorites.artists.find(
      (artist) => artist.id === id,
    );
    if (!artistToRemove) throw new NotFoundException('Track not found');
    this.dbService.data.favorites.artists =
      this.dbService.data.favorites.artists.filter(
        (artist) => artist.id !== id,
      );
    return artistToRemove;
  }
}
