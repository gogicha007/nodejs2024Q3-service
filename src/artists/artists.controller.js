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
exports.ArtistsController = void 0;
var common_1 = require("@nestjs/common");
var ArtistsController = /** @class */ (function () {
    function ArtistsController(artistsService) {
        this.artistsService = artistsService;
    }
    ArtistsController.prototype.findAll = function () {
        return this.artistsService.findAll();
    };
    ArtistsController.prototype.findOne = function (id) {
        return this.artistsService.findOne(id);
    };
    ArtistsController.prototype.createTrack = function (createTrack) {
        return this.artistsService.createArtist(createTrack);
    };
    ArtistsController.prototype.updateTrack = function (id, updateTrack) {
        return this.artistsService.updateArtist(id, updateTrack);
    };
    ArtistsController.prototype.deleteTrack = function (id) {
        return this.artistsService.deleteArtist(id);
    };
    __decorate([
        (0, common_1.Get)()
    ], ArtistsController.prototype, "findAll");
    __decorate([
        (0, common_1.Get)(':id'),
        __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe))
    ], ArtistsController.prototype, "findOne");
    __decorate([
        (0, common_1.Post)(),
        __param(0, (0, common_1.Body)(common_1.ValidationPipe))
    ], ArtistsController.prototype, "createTrack");
    __decorate([
        (0, common_1.Put)(':id'),
        __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
        __param(1, (0, common_1.Body)(common_1.ValidationPipe))
    ], ArtistsController.prototype, "updateTrack");
    __decorate([
        (0, common_1.Delete)(':id'),
        (0, common_1.HttpCode)(204),
        __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe))
    ], ArtistsController.prototype, "deleteTrack");
    ArtistsController = __decorate([
        (0, common_1.Controller)('artist')
    ], ArtistsController);
    return ArtistsController;
}());
exports.ArtistsController = ArtistsController;
