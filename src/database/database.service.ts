import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
    public data = {
        artists: [],
        albums: [],
        tracks: [],
        favorites: [],
    }
}
