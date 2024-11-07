import { NotFoundException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsService {
    public albums = [];

    findAll() {
        return this.albums;
      }
    
      findOne(id: string) {
        const track = this.albums.find((track) => track.id === id);
        if (!track) throw new NotFoundException('Track not found');
        return track;
      }
    
      createAlbum(createAlbum: CreateAlbumDto) {
        const id = uuidv4();
        const newTrack = {
          id: id,
          name: createAlbum.name,
          year: createAlbum.year,
          artistId: createAlbum.artistId,
        };
        this.albums.push(newTrack);
        return newTrack;
      }
    
      updateAlbum(id: string, updateAlbum: UpdateAlbumDto) {
        const albumIdx = this.albums.findIndex((album) => album.id === id);
        if (albumIdx === -1) throw new NotFoundException('Album not found');
        this.albums[albumIdx] = {
          ...this.albums[albumIdx],
          ...updateAlbum,
        };
        return this.findOne(id);
      }
    
      deleteAlbum(id: string) {
        const removedAlbum = this.findOne(id);
        if (!removedAlbum) throw new NotFoundException('Album not found');
        this.albums = this.albums.filter((track) => track.id !== id);
        return removedAlbum;
      }

      getAlbums(){
        return this.albums
      }
}
