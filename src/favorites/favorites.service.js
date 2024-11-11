"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FavoritesService = void 0;
var common_1 = require("@nestjs/common");
var FavoritesService = /** @class */ (function () {
    function FavoritesService(dbService) {
        this.dbService = dbService;
    }
    FavoritesService.prototype.getAllFavs = function () {
        var _this = this;
        var result = Object.keys(this.dbService.data.favorites).reduce(function (acc, val) {
            var array = _this.dbService.data.favorites[val].map(function (e) {
                var eCopy = JSON.parse(JSON.stringify(e));
                return eCopy;
            });
            acc[val] = array;
            return acc;
        }, {});
        return result;
    };
    FavoritesService.prototype.addTrack = function (id) {
        var trackToAdd = this.dbService.data.tracks.find(function (track) { return track.id === id; });
        if (!trackToAdd)
            throw new common_1.UnprocessableEntityException('Track not found');
        this.dbService.data.favorites.tracks.push(trackToAdd);
        return trackToAdd;
    };
    FavoritesService.prototype.removeTrack = function (id) {
        var trackToRemove = this.dbService.data.favorites.tracks.find(function (track) { return track.id === id; });
        if (!trackToRemove)
            throw new common_1.NotFoundException('Track not found');
        this.dbService.data.favorites.tracks =
            this.dbService.data.favorites.tracks.filter(function (track) { return track.id !== id; });
        return trackToRemove;
    };
    FavoritesService.prototype.addAlbum = function (id) {
        var albumToAdd = this.dbService.data.albums.find(function (album) { return album.id === id; });
        if (!albumToAdd)
            throw new common_1.UnprocessableEntityException('Album not found');
        this.dbService.data.favorites.albums.push(albumToAdd);
        return albumToAdd;
    };
    FavoritesService.prototype.removeAlbum = function (id) {
        var albumToRemove = this.dbService.data.favorites.albums.find(function (album) { return album.id === id; });
        if (!albumToRemove)
            throw new common_1.NotFoundException('Album not found');
        this.dbService.data.favorites.albums =
            this.dbService.data.favorites.albums.filter(function (album) { return album.id !== id; });
        return albumToRemove;
    };
    FavoritesService.prototype.addArtist = function (id) {
        var artist = this.dbService.data.artists.find(function (artist) { return artist.id === id; });
        if (!artist)
            throw new common_1.UnprocessableEntityException('Artist not found');
        this.dbService.data.favorites.artists.push(artist);
        return artist;
    };
    FavoritesService.prototype.removeArtist = function (id) {
        var artistToRemove = this.dbService.data.favorites.artists.find(function (artist) { return artist.id === id; });
        if (!artistToRemove)
            throw new common_1.NotFoundException('Artist not found');
        this.dbService.data.favorites.artists =
            this.dbService.data.favorites.artists.filter(function (artist) { return artist.id !== id; });
        return artistToRemove;
    };
    FavoritesService = __decorate([
        (0, common_1.Injectable)()
    ], FavoritesService);
    return FavoritesService;
}());
exports.FavoritesService = FavoritesService;
