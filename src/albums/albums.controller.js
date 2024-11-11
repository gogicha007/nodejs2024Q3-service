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
exports.AlbumsController = void 0;
var common_1 = require("@nestjs/common");
var AlbumsController = /** @class */ (function () {
    function AlbumsController(albumsService) {
        this.albumsService = albumsService;
    }
    AlbumsController.prototype.findAll = function () {
        return this.albumsService.findAll();
    };
    AlbumsController.prototype.findOnde = function (id) {
        return this.albumsService.findOne(id);
    };
    AlbumsController.prototype.createAlbum = function (createAlbum) {
        return this.albumsService.createAlbum(createAlbum);
    };
    AlbumsController.prototype.updateAlbum = function (id, updateAlbum) {
        return this.albumsService.updateAlbum(id, updateAlbum);
    };
    AlbumsController.prototype.deleteAlbum = function (id) {
        return this.albumsService.deleteAlbum(id);
    };
    __decorate([
        (0, common_1.Get)()
    ], AlbumsController.prototype, "findAll");
    __decorate([
        (0, common_1.Get)(':id'),
        __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe))
    ], AlbumsController.prototype, "findOnde");
    __decorate([
        (0, common_1.Post)(),
        __param(0, (0, common_1.Body)(common_1.ValidationPipe))
    ], AlbumsController.prototype, "createAlbum");
    __decorate([
        (0, common_1.Put)(':id'),
        __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
        __param(1, (0, common_1.Body)(common_1.ValidationPipe))
    ], AlbumsController.prototype, "updateAlbum");
    __decorate([
        (0, common_1.Delete)(':id'),
        (0, common_1.HttpCode)(204),
        __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe))
    ], AlbumsController.prototype, "deleteAlbum");
    AlbumsController = __decorate([
        (0, common_1.Controller)('album')
    ], AlbumsController);
    return AlbumsController;
}());
exports.AlbumsController = AlbumsController;
