"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserService = void 0;
var common_1 = require("@nestjs/common");
var uuid_1 = require("uuid");
var UserService = /** @class */ (function () {
    function UserService() {
        this.users = [];
    }
    UserService.prototype.findAll = function () {
        var result = this.users.map(function (user) {
            var userCopy = JSON.parse(JSON.stringify(user));
            delete userCopy.password;
            return userCopy;
        });
        console.log(this.users);
        return result;
    };
    UserService.prototype.findOne = function (id) {
        var user = this.users.find(function (user) { return user.id === id; });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        var res = {
            id: user.id,
            login: user.login,
            version: user.version,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
        return res;
    };
    UserService.prototype.create = function (createUser) {
        var id = (0, uuid_1.v4)();
        var newUser = {
            id: id,
            login: createUser.login,
            password: createUser.password,
            version: 1,
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime()
        };
        this.users.push(newUser);
        var res = {
            id: id,
            login: newUser.login,
            version: newUser.version,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt
        };
        return res;
    };
    UserService.prototype.update = function (id, updatedPassword) {
        var userIdx = this.users.findIndex(function (user) { return user.id === id; });
        if (userIdx === -1)
            throw new common_1.NotFoundException('User not found');
        if (this.users[userIdx].password !== updatedPassword.oldPassword)
            throw new common_1.HttpException('Old password is wrong', common_1.HttpStatus.FORBIDDEN);
        this.users[userIdx].password = updatedPassword.newPassword;
        this.users[userIdx].version++;
        this.users[userIdx].updatedAt = new Date().getTime();
        return this.findOne(id);
    };
    UserService.prototype["delete"] = function (id) {
        var removedUser = this.findOne(id);
        if (!removedUser)
            throw new common_1.NotFoundException('User not found');
        this.users = this.users.filter(function (user) { return user.id !== id; });
        return removedUser;
    };
    UserService = __decorate([
        (0, common_1.Injectable)()
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
