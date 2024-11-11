import { NotFoundException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AlbumsService {
  constructor(private readonly dbService: DatabaseService) {}

  findAll() {
    return this.dbService.data.albums;
  }

  findOne(id: string) {
    const album = this.dbService.data.albums.find((album) => album.id === id);
    if (!album) throw new NotFoundException('Track not found');
    return album;
  }

  createAlbum(createAlbum: CreateAlbumDto) {
    const id = uuidv4();
    const newTrack = {
      id: id,
      name: createAlbum.name,
      year: createAlbum.year,
      artistId: createAlbum.artistId ? createAlbum.artistId : null,
    };
    this.dbService.data.albums.push(newTrack);
    return newTrack;
  }

  updateAlbum(id: string, updateAlbum: UpdateAlbumDto) {
    const albumIdx = this.dbService.data.albums.findIndex(
      (album) => album.id === id,
    );
    if (albumIdx === -1) throw new NotFoundException('Album not found');
    this.dbService.data.albums[albumIdx] = {
      ...this.dbService.data.albums[albumIdx],
      ...updateAlbum,
    };
    return this.findOne(id);
  }

  deleteAlbum(id: string) {
    const removedAlbum = this.findOne(id);
    if (!removedAlbum) throw new NotFoundException('Album not found');
    this.dbService.data.albums = this.dbService.data.albums.filter(
      (album) => album.id !== id,
    );
    this.dbService.data.tracks.map((track) => {
      if (track.albumId === removedAlbum.id) track.albumId = null;
    });
    this.dbService.data.favorites.albums =
      this.dbService.data.favorites.albums.filter(
        (album) => album.id !== removedAlbum.id,
      );
    return removedAlbum;
  }
}
