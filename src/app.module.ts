import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { TrackModule } from './tracks/track.module';
import { AlbumsModule } from './albums/albums.module';
import { ArtistsModule } from './artists/artists.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [UserModule, TrackModule, AlbumsModule, ArtistsModule, FavoritesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
