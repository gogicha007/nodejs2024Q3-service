"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.FavoritesController = void 0;
var common_1 = require("@nestjs/common");
var FavoritesController = /** @class */ (function () {
    function FavoritesController(favoritesService) {
        this.favoritesService = favoritesService;
    }
    FavoritesController.prototype.getAll = function () {
        return this.favoritesService.getAllFavs();
    };
    FavoritesController.prototype.addTrack = function (id) {
        return this.favoritesService.addTrack(id);
    };
    FavoritesController.prototype.removeTrack = function (id) {
        return this.favoritesService.removeTrack(id);
    };
    FavoritesController.prototype.addAlbum = function (id) {
        return this.favoritesService.addAlbum(id);
    };
    FavoritesController.prototype.removeAlbum = function (id) {
        return this.favoritesService.removeAlbum(id);
    };
    FavoritesController.prototype.addArtist = function (id) {
        return this.favoritesService.addArtist(id);
    };
    FavoritesController.prototype.removeArtist = function (id) {
        return this.favoritesService.removeArtist(id);
    };
    __decorate([
        (0, common_1.Get)()
    ], FavoritesController.prototype, "getAll");
    __decorate([
        (0, common_1.Post)('track/:id'),
        (0, common_1.HttpCode)(201),
        __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe))
    ], FavoritesController.prototype, "addTrack");
    __decorate([
        (0, common_1.Delete)('track/:id'),
        (0, common_1.HttpCode)(204),
        __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe))
    ], FavoritesController.prototype, "removeTrack");
    __decorate([
        (0, common_1.Post)('album/:id'),
        __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe))
    ], FavoritesController.prototype, "addAlbum");
    __decorate([
        (0, common_1.Delete)('album/:id'),
        (0, common_1.HttpCode)(204),
        __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe))
    ], FavoritesController.prototype, "removeAlbum");
    __decorate([
        (0, common_1.Post)('artist/:id'),
        __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe))
    ], FavoritesController.prototype, "addArtist");
    __decorate([
        (0, common_1.Delete)('artist/:id'),
        (0, common_1.HttpCode)(204),
        __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe))
    ], FavoritesController.prototype, "removeArtist");
    FavoritesController = __decorate([
        (0, common_1.Controller)('favs')
    ], FavoritesController);
    return FavoritesController;
}());
exports.FavoritesController = FavoritesController;
