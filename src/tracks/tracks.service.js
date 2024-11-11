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
exports.TracksService = void 0;
var common_1 = require("@nestjs/common");
var uuid_1 = require("uuid");
var TracksService = /** @class */ (function () {
    function TracksService(dbService) {
        this.dbService = dbService;
    }
    TracksService.prototype.findAll = function () {
        console.log(this.dbService.data);
        return this.dbService.data.tracks;
    };
    TracksService.prototype.findOne = function (id) {
        var track = this.dbService.data.tracks.find(function (track) { return track.id === id; });
        if (!track)
            throw new common_1.NotFoundException('Track not found');
        return track;
    };
    TracksService.prototype.createTrack = function (createTrack) {
        var id = (0, uuid_1.v4)();
        var newTrack = {
            id: id,
            name: createTrack.name,
            artistId: createTrack.artistId ? createTrack.artistId : null,
            albumId: createTrack.albumId ? createTrack.albumId : null,
            duration: createTrack.duration
        };
        this.dbService.data.tracks.push(newTrack);
        return newTrack;
    };
    TracksService.prototype.updateTrack = function (id, updateTrack) {
        var trackIdx = this.dbService.data.tracks.findIndex(function (track) { return track.id === id; });
        if (trackIdx === -1)
            throw new common_1.NotFoundException('Track not found');
        this.dbService.data.tracks[trackIdx] = __assign(__assign({}, this.dbService.data.tracks[trackIdx]), updateTrack);
        return this.findOne(id);
    };
    TracksService.prototype.deleteTrack = function (id) {
        var removedTrack = this.findOne(id);
        if (!removedTrack)
            throw new common_1.NotFoundException('Track not found');
        this.dbService.data.tracks = this.dbService.data.tracks.filter(function (track) { return track.id !== id; });
        this.dbService.data.favorites.tracks =
            this.dbService.data.favorites.tracks.filter(function (track) { return track.id !== removedTrack.id; });
        return removedTrack;
    };
    TracksService = __decorate([
        (0, common_1.Injectable)()
    ], TracksService);
    return TracksService;
}());
exports.TracksService = TracksService;
