import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    const checkFavs = await this.favorites.findMany()
    if(checkFavs.length===0) {
      await this.favorites.create({
        data: {
          artists: [],
          albums: [],
          tracks: []
        },

      })
    }
  }

  
  public data = {
    artists: [],
    albums: [],
    tracks: [],
    favorites: {
      artists: [],
      albums: [],
      tracks: [],
    },
  };
}
