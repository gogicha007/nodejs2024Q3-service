import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly dbService: DatabaseService) {}

  async getAllFavs() {
    return await this.dbService.favorites.findMany();
  }

  async addTrack(id: string) {
    const trackToAdd = await this.dbService.track.findUnique({
      where: {
        id,
      },
    });
    if (!trackToAdd) throw new UnprocessableEntityException('Track not found');
    await this.dbService.favorites.update({
      where: {
        id: 0,
      }, 
      data: {
        tracks: {
          push: id,
        }
      }
    })
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

  async addAlbum(id: string) {
    const albumToAdd = this.dbService.album.findUnique({
      where: {
        id,
      }
    });
    if (!albumToAdd) throw new UnprocessableEntityException('Album not found');
    await this.dbService.favorites.update({
      where: {
        id: 0,
      }, 
      data: {
        albums: {
          push: id,
        }
      }
    })
    return albumToAdd;
  }

  removeAlbum(id: string) {
    const albumToRemove = this.dbService.data.favorites.albums.find(
      (album) => album.id === id,
    );
    if (!albumToRemove) throw new NotFoundException('Album not found');
    this.dbService.data.favorites.albums =
      this.dbService.data.favorites.albums.filter((album) => album.id !== id);
    return albumToRemove;
  }

  async addArtist(id: string) {
    const artistToAdd = this.dbService.data.artists.find(
      (artist) => artist.id === id,
    );
    if (!artistToAdd) throw new UnprocessableEntityException('Artist not found');
    await this.dbService.favorites.update({
      where: {
        id: 0
      },
      data: {
        artists: {
          push: id,
        }
      }
    });
    return artistToAdd;
  }

  removeArtist(id: string) {
    const artistToRemove = this.dbService.data.favorites.artists.find(
      (artist) => artist.id === id,
    );
    if (!artistToRemove) throw new NotFoundException('Artist not found');
    this.dbService.data.favorites.artists =
      this.dbService.data.favorites.artists.filter(
        (artist) => artist.id !== id,
      );
    return artistToRemove;
  }
}
