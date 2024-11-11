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
exports.ArtistsService = void 0;
var common_1 = require("@nestjs/common");
var uuid_1 = require("uuid");
var ArtistsService = /** @class */ (function () {
    function ArtistsService(dbService) {
        this.dbService = dbService;
    }
    ArtistsService.prototype.findAll = function () {
        console.log(this.dbService.data);
        return this.dbService.data.artists;
    };
    ArtistsService.prototype.findOne = function (id) {
        var track = this.dbService.data.artists.find(function (track) { return track.id === id; });
        if (!track)
            throw new common_1.NotFoundException('Track not found');
        return track;
    };
    ArtistsService.prototype.createArtist = function (createArtist) {
        var id = (0, uuid_1.v4)();
        var newTrack = {
            id: id,
            name: createArtist.name,
            grammy: createArtist.grammy
        };
        this.dbService.data.artists.push(newTrack);
        return newTrack;
    };
    ArtistsService.prototype.updateArtist = function (id, updateArtist) {
        var artistIdx = this.dbService.data.artists.findIndex(function (track) { return track.id === id; });
        if (artistIdx === -1)
            throw new common_1.NotFoundException('Artist not found');
        this.dbService.data.artists[artistIdx] = __assign(__assign({}, this.dbService.data.artists[artistIdx]), updateArtist);
        return this.findOne(id);
    };
    ArtistsService.prototype.deleteArtist = function (id) {
        var removedArtist = this.findOne(id);
        if (!removedArtist)
            throw new common_1.NotFoundException('Artist not found');
        this.dbService.data.artists = this.dbService.data.artists.filter(function (artist) { return artist.id !== id; });
        this.dbService.data.tracks.map(function (track) {
            if (track.artistId === removedArtist.id)
                track.artistId = null;
        });
        this.dbService.data.albums.map(function (album) {
            if (album.artistId === removedArtist.id)
                album.artistId = null;
        });
        this.dbService.data.favorites.artists =
            this.dbService.data.favorites.artists.filter(function (artist) { return artist.id !== removedArtist.id; });
        return removedArtist;
    };
    ArtistsService = __decorate([
        (0, common_1.Injectable)()
    ], ArtistsService);
    return ArtistsService;
}());
exports.ArtistsService = ArtistsService;
