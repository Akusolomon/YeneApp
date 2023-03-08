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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.UserController = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
var ValidationException_1 = require("./../../../util/exception/ValidationException");
var UserRoles_1 = require("src/util/API/UserRoles");
var JwtAuthGuard_1 = require("./../../../util/auth/jwt/JwtAuthGuard");
var AuthenticatedUser_1 = require("./../domain/AuthenticatedUser");
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
var common_1 = require("@nestjs/common");
var DatabaseFactory_1 = require("src/database/DatabaseFactory");
var jwt_1 = require("@nestjs/jwt");
var UserService_1 = require("../domain/UserService");
var JwtSign_1 = require("src/util/auth/jwt/JwtSign");
var Role_1 = require("src/util/decorators/Role");
var MulterConfig_1 = require("src/util/file_upload/MulterConfig");
var file_interceptor_1 = require("@nestjs/platform-express/multer/interceptors/file.interceptor");
var rxjs_1 = require("rxjs");
var path_1 = require("path");
var UserController = /** @class */ (function () {
    function UserController() {
        this.userService = new UserService_1.UserService();
        this.userService = DatabaseFactory_1.DatabaseFactory.getRepository('user');
        this.jwtService = new jwt_1.JwtService({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: process.env.JWT_EXPIERS_IN
            }
        });
    }
    UserController.prototype.getBlockedUsers = function () {
        return this.userService.getBlockedUsers();
    };
    UserController.prototype.block = function (id) {
        return this.userService.block(id);
    };
    UserController.prototype.unBlock = function (id) {
        return this.userService.unBlock(id);
    };
    UserController.prototype.login = function (userLoginDto) {
        return __awaiter(this, void 0, void 0, function () {
            var userData, access_token, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.login(userLoginDto)];
                    case 1:
                        userData = _a.sent();
                        if (userData) {
                            access_token = new JwtSign_1.JwtSign(this.jwtService, {
                                userId: userData.id,
                                email: userData.email,
                                phone: userData.phone,
                                role: userData.role
                            }).execute();
                            user = AuthenticatedUser_1.AuthenticatedUser.getInstance();
                        }
                        return [2 /*return*/, { access_token: access_token, user: user }];
                }
            });
        });
    };
    UserController.prototype.forgetPassword = function (forgetPass) {
        return this.userService.forgetPassword(forgetPass);
    };
    UserController.prototype.changeUserPassword = function (password, id) {
        return this.userService.changeUserPassword(id, password);
    };
    UserController.prototype.getUsers = function (query) {
        return this.userService.getUsers(query);
    };
    UserController.prototype.getDeletedUsers = function (query) {
        return this.userService.getUsers(query, true);
    };
    UserController.prototype.deleteUser = function (id) {
        return this.userService.deleteUser(id);
    };
    UserController.prototype.unFriend = function (id) {
        return this.userService.unFriend(id);
    };
    UserController.prototype.changePassword = function (password) {
        return this.userService.changePassword(password);
    };
    UserController.prototype.updateUser = function (userUpdate) {
        return this.userService.updateUser(userUpdate);
    };
    UserController.prototype.changePic = function (id, photo) {
        if (!photo) {
            throw new ValidationException_1.ValidationException('Photo required');
        }
        return this.userService.changePic(id, photo.filename);
    };
    UserController.prototype.register = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var userData, access_token, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.register(data)];
                    case 1:
                        userData = _a.sent();
                        if (userData) {
                            access_token = new JwtSign_1.JwtSign(this.jwtService, {
                                userId: userData.id,
                                email: userData.email,
                                phone: userData.phone,
                                role: userData.role
                            }).execute();
                        }
                        user = AuthenticatedUser_1.AuthenticatedUser.getInstance();
                        return [2 /*return*/, { access_token: access_token, user: user }];
                }
            });
        });
    };
    UserController.prototype.addProfile = function (profile, files) {
        if (files) {
            profile.profile = files.filename;
        }
        return this.userService.addProfile(profile);
    };
    UserController.prototype.getMe = function () {
        return this.userService.getMe();
    };
    UserController.prototype.getUserById = function (id) {
        return this.userService.getUserById(id);
    };
    UserController.prototype.changePasswordAd = function (reset, id) {
        return this.userService.changePasswordAd(id, reset);
    };
    UserController.prototype.getFriends = function () {
        return this.userService.getFriends();
    };
    UserController.prototype.getPhoto = function (res, file) {
        var fileName = 'uploads/images/' + file;
        return rxjs_1.of(res.sendFile(path_1.join(process.cwd(), fileName)));
    };
    __decorate([
        common_1.Post('login'),
        common_1.UsePipes(common_1.ValidationPipe),
        __param(0, common_1.Body())
    ], UserController.prototype, "login");
    __decorate([
        common_1.Post('forgetpassword'),
        common_1.UsePipes(common_1.ValidationPipe),
        __param(0, common_1.Body())
    ], UserController.prototype, "forgetPassword");
    __decorate([
        common_1.Post(':id/password'),
        common_1.UseGuards(JwtAuthGuard_1.JwtAuthGuard),
        Role_1.Role([UserRoles_1.UserRoles.ADMIN]),
        __param(0, common_1.Body()), __param(1, common_1.Param('id'))
    ], UserController.prototype, "changeUserPassword");
    __decorate([
        common_1.Get(''),
        common_1.UseGuards(JwtAuthGuard_1.JwtAuthGuard),
        Role_1.Role([UserRoles_1.UserRoles.ADMIN, UserRoles_1.UserRoles.USER]),
        __param(0, common_1.Query())
    ], UserController.prototype, "getUsers");
    __decorate([
        common_1.Get('deleted'),
        common_1.UseGuards(JwtAuthGuard_1.JwtAuthGuard),
        Role_1.Role([UserRoles_1.UserRoles.ADMIN]) //TODO
        ,
        __param(0, common_1.Query())
    ], UserController.prototype, "getDeletedUsers");
    __decorate([
        common_1.Delete('deactivate/:id'),
        common_1.UseGuards(JwtAuthGuard_1.JwtAuthGuard),
        common_1.UsePipes(common_1.ValidationPipe),
        Role_1.Role([UserRoles_1.UserRoles.USER, UserRoles_1.UserRoles.ADMIN]),
        __param(0, common_1.Param('id'))
    ], UserController.prototype, "deleteUser");
    __decorate([
        common_1.Post('unfriend/:id'),
        common_1.UseGuards(JwtAuthGuard_1.JwtAuthGuard),
        common_1.UsePipes(common_1.ValidationPipe),
        Role_1.Role([UserRoles_1.UserRoles.USER]),
        __param(0, common_1.Param('id'))
    ], UserController.prototype, "unFriend");
    __decorate([
        common_1.Post('/changePassword'),
        common_1.UseGuards(JwtAuthGuard_1.JwtAuthGuard),
        common_1.UsePipes(common_1.ValidationPipe),
        Role_1.Role([UserRoles_1.UserRoles.USER]),
        __param(0, common_1.Body())
    ], UserController.prototype, "changePassword");
    __decorate([
        common_1.Patch('/updateMe'),
        common_1.UseGuards(JwtAuthGuard_1.JwtAuthGuard),
        common_1.UsePipes(common_1.ValidationPipe),
        Role_1.Role([UserRoles_1.UserRoles.USER]),
        __param(0, common_1.Body(common_1.ValidationPipe))
    ], UserController.prototype, "updateUser");
    __decorate([
        common_1.Patch('/:id/changePic'),
        common_1.UsePipes(common_1.ValidationPipe),
        common_1.UseGuards(JwtAuthGuard_1.JwtAuthGuard),
        common_1.UseInterceptors(file_interceptor_1.FileInterceptor('photo', MulterConfig_1.MulterConfig)),
        __param(0, common_1.Param('id')), __param(1, common_1.UploadedFile())
    ], UserController.prototype, "changePic");
    __decorate([
        common_1.Post('add'),
        common_1.UsePipes(common_1.ValidationPipe),
        __param(0, common_1.Body())
    ], UserController.prototype, "register");
    __decorate([
        common_1.Post('addProfile'),
        common_1.UseGuards(JwtAuthGuard_1.JwtAuthGuard),
        common_1.UseInterceptors(file_interceptor_1.FileInterceptor('profile', MulterConfig_1.MulterConfig)),
        Role_1.Role([UserRoles_1.UserRoles.USER]),
        __param(0, common_1.Body()), __param(1, common_1.UploadedFiles())
    ], UserController.prototype, "addProfile");
    __decorate([
        common_1.Get('me'),
        common_1.UseGuards(JwtAuthGuard_1.JwtAuthGuard),
        Role_1.Role([UserRoles_1.UserRoles.USER])
    ], UserController.prototype, "getMe");
    __decorate([
        common_1.Get('/:id'),
        common_1.UseGuards(JwtAuthGuard_1.JwtAuthGuard),
        Role_1.Role([UserRoles_1.UserRoles.USER]),
        __param(0, common_1.Param('id'))
    ], UserController.prototype, "getUserById");
    __decorate([
        common_1.Post('/:id/reset'),
        common_1.UseGuards(JwtAuthGuard_1.JwtAuthGuard),
        Role_1.Role([UserRoles_1.UserRoles.ADMIN]),
        __param(0, common_1.Body()), __param(1, common_1.Param('id'))
    ], UserController.prototype, "changePasswordAd");
    __decorate([
        common_1.Get('friends/me'),
        common_1.UseGuards(JwtAuthGuard_1.JwtAuthGuard),
        Role_1.Role([UserRoles_1.UserRoles.USER])
    ], UserController.prototype, "getFriends");
    __decorate([
        common_1.Get('/image/:file'),
        __param(0, common_1.Res()), __param(1, common_1.Param('file'))
    ], UserController.prototype, "getPhoto");
    UserController = __decorate([
        common_1.Controller('user')
    ], UserController);
    return UserController;
}());
exports.UserController = UserController;
