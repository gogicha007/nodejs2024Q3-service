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
exports.UserController = void 0;
var common_1 = require("@nestjs/common");
var UserController = /** @class */ (function () {
    function UserController(userService) {
        this.userService = userService;
    }
    UserController.prototype.findAll = function () {
        return this.userService.findAll();
    };
    UserController.prototype.findOne = function (id) {
        return this.userService.findOne(id);
    };
    UserController.prototype.create = function (createUser) {
        return this.userService.create(createUser);
    };
    UserController.prototype.update = function (id, updateUser) {
        return this.userService.update(id, updateUser);
    };
    UserController.prototype["delete"] = function (id) {
        return this.userService["delete"](id);
    };
    __decorate([
        (0, common_1.Get)()
    ], UserController.prototype, "findAll");
    __decorate([
        (0, common_1.Get)(':id'),
        __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe))
    ], UserController.prototype, "findOne");
    __decorate([
        (0, common_1.Post)(),
        __param(0, (0, common_1.Body)(common_1.ValidationPipe))
    ], UserController.prototype, "create");
    __decorate([
        (0, common_1.Put)(':id'),
        __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
        __param(1, (0, common_1.Body)(common_1.ValidationPipe))
    ], UserController.prototype, "update");
    __decorate([
        (0, common_1.Delete)(':id'),
        (0, common_1.HttpCode)(204),
        __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe))
    ], UserController.prototype, "delete");
    UserController = __decorate([
        (0, common_1.Controller)('user')
    ], UserController);
    return UserController;
}());
exports.UserController = UserController;
