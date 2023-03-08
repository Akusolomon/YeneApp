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
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.prototype.getFriends = function () {
        throw new Error('Method not implemented.');
    };
    UserService.prototype.changePic = function (id, filename) {
        throw new Error('Method not implemented.');
    };
    UserService.prototype.unFriend = function (id) {
        throw new Error('Method not implemented.');
    };
    UserService.prototype.changePasswordAd = function (id, reset) {
        throw new Error('Method not implemented.');
    };
    UserService.prototype.getUserById = function (id) {
        throw new Error('Method not implemented.');
    };
    UserService.prototype.deleteUser = function (id) {
        throw new Error('Method not implemented.');
    };
    UserService.prototype.deleteEvent = function (id) {
        throw new Error('Method not implemented.');
    };
    UserService.prototype.unBlock = function (id) {
        return this.repository.unBlock(id);
    };
    UserService.prototype.getUsers = function (query, deleted) {
        return this.repository.getUsers(query);
    };
    UserService.prototype.updateUser = function (userUpdate) {
        return this.repository.updateUser(userUpdate);
    };
    UserService.prototype.getMe = function () {
        return this.repository.getMe();
    };
    UserService.prototype.changePassword = function (password) {
        return this.repository.changePassword(password);
    };
    UserService.prototype.addProfile = function (profile) {
        return this.repository.addProfile(profile);
    };
    UserService.prototype.changeUserPassword = function (id, password) {
        return this.repository.changeUserPassword(id, password);
    };
    UserService.prototype.register = function (user) {
        return this.repository.register(user);
    };
    UserService.prototype.getBlockedUsers = function () {
        return this.repository.getBlockedUsers;
    };
    UserService.prototype.login = function (userloginDto) {
        return this.repository.login(userloginDto);
    };
    UserService.prototype.forgetPassword = function (forgetPass) {
        return this.repository.forgetPassword(forgetPass);
    };
    UserService.prototype.block = function (id) {
        return this.repository.block(id);
    };
    UserService = __decorate([
        common_1.Injectable()
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
