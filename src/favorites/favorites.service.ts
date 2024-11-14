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
        },
      },
    });
    return trackToAdd;
  }

  async removeTrack(id: string) {
    const trackToRemove = await this.dbService.track.findUnique({
      where: {
        id,
      },
    });
    if (!trackToRemove) throw new NotFoundException('Track not found');

    const tracksArr = await this.dbService.favorites.findFirst({
      select: {
        tracks: true,
      },
    });

    await this.dbService.favorites.update({
      where: {
        id: 0,
      },
      data: {
        albums: tracksArr.tracks.filter((albId) => albId !== id),
      },
    });
    return trackToRemove;
  }

  async addAlbum(id: string) {
    const albumToAdd = this.dbService.album.findUnique({
      where: {
        id,
      },
    });
    if (!albumToAdd) throw new UnprocessableEntityException('Album not found');
    await this.dbService.favorites.update({
      where: {
        id: 0,
      },
      data: {
        albums: {
          push: id,
        },
      },
    });
    return albumToAdd;
  }

  async removeAlbum(id: string) {
    const albumToRemove = this.dbService.album.findUnique({
      where: {
        id,
      },
    });
    if (!albumToRemove) throw new NotFoundException('Album not found');
    const albumsArr = await this.dbService.favorites.findFirst({
      select: {
        albums: true,
      },
    });

    await this.dbService.favorites.update({
      where: {
        id: 0,
      },
      data: {
        albums: albumsArr.albums.filter((albId) => albId !== id),
      },
    });
    return albumToRemove;
  }

  async addArtist(id: string) {
    const artistToAdd = this.dbService.artist.findUnique({
      where: {
        id,
      },
    });
    if (!artistToAdd)
      throw new UnprocessableEntityException('Artist not found');
    await this.dbService.favorites.update({
      where: {
        id: 0,
      },
      data: {
        artists: {
          push: id,
        },
      },
    });
    return artistToAdd;
  }

  async removeArtist(id: string) {
    const artistToRemove = this.dbService.artist.findUnique({
      where: {
        id,
      },
    });
    if (!artistToRemove) throw new NotFoundException('Artist not found');
    const artistsArr = await this.dbService.favorites.findFirst({
      select: {
        artists: true,
      },
    });

    await this.dbService.favorites.update({
      where: {
        id: 0,
      },
      data: {
        artists: artistsArr.artists.filter((artId) => artId !== id),
      },
    });
    return artistToRemove;
  }
}
