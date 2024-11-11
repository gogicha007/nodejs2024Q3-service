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
exports.TracksController = void 0;
var common_1 = require("@nestjs/common");
var TracksController = /** @class */ (function () {
    function TracksController(trackServise) {
        this.trackServise = trackServise;
    }
    TracksController.prototype.findAll = function () {
        return this.trackServise.findAll();
    };
    TracksController.prototype.findOnde = function (id) {
        return this.trackServise.findOne(id);
    };
    TracksController.prototype.createTrack = function (createTrack) {
        return this.trackServise.createTrack(createTrack);
    };
    TracksController.prototype.updateTrack = function (id, updateTrack) {
        return this.trackServise.updateTrack(id, updateTrack);
    };
    TracksController.prototype.deleteTrack = function (id) {
        return this.trackServise.deleteTrack(id);
    };
    __decorate([
        (0, common_1.Get)()
    ], TracksController.prototype, "findAll");
    __decorate([
        (0, common_1.Get)(':id'),
        __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe))
    ], TracksController.prototype, "findOnde");
    __decorate([
        (0, common_1.Post)(),
        __param(0, (0, common_1.Body)(common_1.ValidationPipe))
    ], TracksController.prototype, "createTrack");
    __decorate([
        (0, common_1.Put)(':id'),
        __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
        __param(1, (0, common_1.Body)(common_1.ValidationPipe))
    ], TracksController.prototype, "updateTrack");
    __decorate([
        (0, common_1.Delete)(':id'),
        (0, common_1.HttpCode)(204),
        __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe))
    ], TracksController.prototype, "deleteTrack");
    TracksController = __decorate([
        (0, common_1.Controller)('track')
    ], TracksController);
    return TracksController;
}());
exports.TracksController = TracksController;
