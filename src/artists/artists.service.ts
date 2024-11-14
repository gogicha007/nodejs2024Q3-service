import { NotFoundException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ArtistsService {
  constructor(private readonly dbService: DatabaseService) {}

  async createArtist(createArtist: Prisma.ArtistCreateInput) {
    const id = uuidv4();
    const newArtist = {
      id: id,
      name: createArtist.name,
      grammy: createArtist.grammy,
    };
    await this.dbService.artist.create({
      data: newArtist,
    });
    return newArtist;
  }

  async findAll() {
    return this.dbService.artist.findMany();
  }

  async findOne(id: string) {
    const artist = await this.dbService.artist.findUnique({
      where: {
        id,
      },
    });
    if (!artist) throw new NotFoundException('Artist not found');
    return artist;
  }

  async updateArtist(id: string, updateArtist: Prisma.ArtistUpdateInput) {
    const theArtist = await this.findOne(id);
    if (!theArtist) throw new NotFoundException('Artist not found');
    const updateData = {
      ...theArtist,
      ...updateArtist,
    };
    await this.dbService.artist.update({
      where: {
        id,
      },
      data: updateData,
    });
    return this.findOne(id);
  }

  async deleteArtist(id: string) {
    const removedArtist = await this.findOne(id);
    if (!removedArtist) throw new NotFoundException('Artist not found');
    await this.dbService.artist.delete({
      where: {
        id,
      },
    });
    // update tracks
    await this.dbService.track.updateMany({
      where: {
        artistId: id,
      },
      data: {
        artistId: null,
      },
    });

    // update albums
    this.dbService.album.updateMany({
      where: {
        artistId: id,
      },
      data: {
        artistId: null,
      },
    });
    // update favorites
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
    return removedArtist;
  }
}
