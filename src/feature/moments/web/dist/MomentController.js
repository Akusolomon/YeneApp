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
exports.MomentController = void 0;
var LikeService_1 = require("./../../likes/domain/LikeService");
var CommentService_1 = require("./../../comments/domain/CommentService");
var ValidationException_1 = require("./../../../util/exception/ValidationException");
var UserRoles_1 = require("./../../../util/API/UserRoles");
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
var file_fields_interceptor_1 = require("@nestjs/platform-express/multer/interceptors/file-fields.interceptor");
var JwtAuthGuard_1 = require("./../../../util/auth/jwt/JwtAuthGuard");
var DatabaseFactory_1 = require("src/database/DatabaseFactory");
var common_1 = require("@nestjs/common");
var MomentService_1 = require("../domain/MomentService");
var common_2 = require("@nestjs/common");
var MulterConfig_1 = require("src/util/file_upload/MulterConfig");
var Role_1 = require("src/util/decorators/Role");
var common_3 = require("@nestjs/common");
var path_1 = require("path");
var rxjs_1 = require("rxjs");
var MomentController = /** @class */ (function () {
    function MomentController() {
        this.service = new MomentService_1.MomentService();
        this.service = DatabaseFactory_1.DatabaseFactory.getRepository('moment');
        this.commentService = new CommentService_1.CommentService();
        this.commentService = DatabaseFactory_1.DatabaseFactory.getRepository('comment');
        this.likeService = new LikeService_1.LikeService();
        this.likeService = DatabaseFactory_1.DatabaseFactory.getRepository('like');
    }
    MomentController.prototype.addMoment = function (data, medias) {
        if (!data.event)
            throw new ValidationException_1.ValidationException('Event Is Required');
        return this.service.addMoment(data, medias);
    };
    MomentController.prototype.updateMoment = function (id, data) {
        return this.service.updateMoment(id, data);
    };
    MomentController.prototype.deleteMoment = function (id) {
        return this.service.deleteMoment(id);
    };
    MomentController.prototype.getMomentById = function (id) {
        return this.service.getMomentById(id);
    };
    MomentController.prototype.getPhoto = function (res, file) {
        var fileName = 'uploads/images/' + file;
        return rxjs_1.of(res.sendFile(path_1.join(process.cwd(), fileName)));
    };
    MomentController.prototype.getMoments = function (query, deleted) {
        return this.service.getMoments(query);
    };
    MomentController.prototype.getComment = function (id) {
        return this.commentService.getComment(id);
    };
    MomentController.prototype.getLikes = function (id) {
        return this.likeService.getLikes(id);
    };
    __decorate([
        common_2.Post('/add'),
        common_1.UseGuards(JwtAuthGuard_1.JwtAuthGuard),
        common_1.UsePipes(common_1.ValidationPipe),
        common_1.UseInterceptors(file_fields_interceptor_1.FileFieldsInterceptor([{ name: 'medias', maxCount: 15 }], MulterConfig_1.MulterConfig)),
        Role_1.Role([UserRoles_1.UserRoles.USER]),
        __param(0, common_1.Body()), __param(1, common_3.UploadedFiles())
    ], MomentController.prototype, "addMoment");
    __decorate([
        common_1.Patch(':id'),
        common_1.UseGuards(JwtAuthGuard_1.JwtAuthGuard),
        common_1.UsePipes(common_1.ValidationPipe),
        Role_1.Role([UserRoles_1.UserRoles.USER]),
        __param(0, common_1.Param('id')), __param(1, common_1.Body())
    ], MomentController.prototype, "updateMoment");
    __decorate([
        common_1.Delete(':id'),
        common_1.UseGuards(JwtAuthGuard_1.JwtAuthGuard),
        common_1.UsePipes(common_1.ValidationPipe),
        Role_1.Role([UserRoles_1.UserRoles.USER]),
        __param(0, common_1.Param('id'))
    ], MomentController.prototype, "deleteMoment");
    __decorate([
        common_1.Get(':id'),
        common_1.UseGuards(JwtAuthGuard_1.JwtAuthGuard),
        common_1.UsePipes(common_1.ValidationPipe),
        Role_1.Role([UserRoles_1.UserRoles.USER]),
        __param(0, common_1.Param('id'))
    ], MomentController.prototype, "getMomentById");
    __decorate([
        common_1.Get('/image/:file'),
        __param(0, common_1.Res()), __param(1, common_1.Param('file'))
    ], MomentController.prototype, "getPhoto");
    __decorate([
        common_1.Get(),
        common_1.UseGuards(JwtAuthGuard_1.JwtAuthGuard),
        common_1.UsePipes(common_1.ValidationPipe),
        Role_1.Role([UserRoles_1.UserRoles.USER]),
        __param(0, common_1.Query())
    ], MomentController.prototype, "getMoments");
    __decorate([
        common_1.Get('comment/:id'),
        common_1.UseGuards(JwtAuthGuard_1.JwtAuthGuard),
        common_1.UsePipes(common_1.ValidationPipe),
        Role_1.Role([UserRoles_1.UserRoles.USER]),
        __param(0, common_1.Param('id'))
    ], MomentController.prototype, "getComment");
    __decorate([
        common_1.Get('like/:id'),
        common_1.UseGuards(JwtAuthGuard_1.JwtAuthGuard),
        common_1.UsePipes(common_1.ValidationPipe),
        Role_1.Role([UserRoles_1.UserRoles.USER]),
        __param(0, common_1.Param('id'))
    ], MomentController.prototype, "getLikes");
    MomentController = __decorate([
        common_1.Controller('moment')
    ], MomentController);
    return MomentController;
}());
exports.MomentController = MomentController;
