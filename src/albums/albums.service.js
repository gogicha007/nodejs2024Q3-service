"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AlbumsService = void 0;
var common_1 = require("@nestjs/common");
var uuid_1 = require("uuid");
var AlbumsService = /** @class */ (function () {
    function AlbumsService(dbService) {
        this.dbService = dbService;
    }
    AlbumsService.prototype.findAll = function () {
        return this.dbService.data.albums;
    };
    AlbumsService.prototype.findOne = function (id) {
        var album = this.dbService.data.albums.find(function (album) { return album.id === id; });
        if (!album)
            throw new common_1.NotFoundException('Track not found');
        return album;
    };
    AlbumsService.prototype.createAlbum = function (createAlbum) {
        var id = (0, uuid_1.v4)();
        var newTrack = {
            id: id,
            name: createAlbum.name,
            year: createAlbum.year,
            artistId: createAlbum.artistId ? createAlbum.artistId : null
        };
        this.dbService.data.albums.push(newTrack);
        return newTrack;
    };
    AlbumsService.prototype.updateAlbum = function (id, updateAlbum) {
        var albumIdx = this.dbService.data.albums.findIndex(function (album) { return album.id === id; });
        if (albumIdx === -1)
            throw new common_1.NotFoundException('Album not found');
        this.dbService.data.albums[albumIdx] = __assign(__assign({}, this.dbService.data.albums[albumIdx]), updateAlbum);
        return this.findOne(id);
    };
    AlbumsService.prototype.deleteAlbum = function (id) {
        var removedAlbum = this.findOne(id);
        if (!removedAlbum)
            throw new common_1.NotFoundException('Album not found');
        this.dbService.data.albums = this.dbService.data.albums.filter(function (album) { return album.id !== id; });
        this.dbService.data.tracks.map(function (track) {
            if (track.albumId === removedAlbum.id)
                track.albumId = null;
        });
        this.dbService.data.favorites.albums =
            this.dbService.data.favorites.albums.filter(function (album) { return album.id !== removedAlbum.id; });
        return removedAlbum;
    };
    AlbumsService = __decorate([
        (0, common_1.Injectable)()
    ], AlbumsService);
    return AlbumsService;
}());
exports.AlbumsService = AlbumsService;
