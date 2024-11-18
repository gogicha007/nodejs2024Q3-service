"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FavoritesModule = void 0;
var common_1 = require("@nestjs/common");
var favorites_controller_1 = require("./favorites.controller");
var favorites_service_1 = require("./favorites.service");
var database_module_1 = require("../../../../../src/database/database.module");
var FavoritesModule = /** @class */ (function () {
    function FavoritesModule() {
    }
    FavoritesModule = __decorate([
        (0, common_1.Module)({
            imports: [database_module_1.DatabaseModule],
            controllers: [favorites_controller_1.FavoritesController],
            providers: [favorites_service_1.FavoritesService]
        })
    ], FavoritesModule);
    return FavoritesModule;
}());
exports.FavoritesModule = FavoritesModule;
