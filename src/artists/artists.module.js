"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ArtistsModule = void 0;
var common_1 = require("@nestjs/common");
var artists_controller_1 = require("./artists.controller");
var artists_service_1 = require("./artists.service");
var database_module_1 = require("../../../../../src/database/database.module");
var ArtistsModule = /** @class */ (function () {
    function ArtistsModule() {
    }
    ArtistsModule = __decorate([
        (0, common_1.Module)({
            imports: [database_module_1.DatabaseModule],
            controllers: [artists_controller_1.ArtistsController],
            providers: [artists_service_1.ArtistsService]
        })
    ], ArtistsModule);
    return ArtistsModule;
}());
exports.ArtistsModule = ArtistsModule;
