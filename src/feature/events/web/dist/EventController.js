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
exports.EventController = void 0;
var DatabaseFactory_1 = require("src/database/DatabaseFactory");
var EventService_1 = require("./../domain/EventService");
var ValidationException_1 = require("src/util/exception/ValidationException");
/* eslint-disable @typescript-eslint/no-unused-vars */
var MulterConfig_1 = require("src/util/file_upload/MulterConfig");
var JwtAuthGuard_1 = require("src/util/auth/jwt/JwtAuthGuard");
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
var common_1 = require("@nestjs/common");
var UserRoles_1 = require("src/util/API/UserRoles");
var Role_1 = require("src/util/decorators/Role");
var file_fields_interceptor_1 = require("@nestjs/platform-express/multer/interceptors/file-fields.interceptor");
var rxjs_1 = require("rxjs");
var path_1 = require("path");
var file_interceptor_1 = require("@nestjs/platform-express/multer/interceptors/file.interceptor");
var LikeService_1 = require("src/feature/likes/domain/LikeService");
var CommentService_1 = require("src/feature/comments/domain/CommentService");
var EventController = /** @class */ (function () {
    function EventController() {
        this.service = new EventService_1.EventService();
        this.service = DatabaseFactory_1.DatabaseFactory.getRepository('event');
        this.commentService = new CommentService_1.CommentService();
        this.commentService = DatabaseFactory_1.DatabaseFactory.getRepository('comment');
        this.likeService = new LikeService_1.LikeService();
        this.likeService = DatabaseFactory_1.DatabaseFactory.getRepository('like');
    }
    EventController.prototype.createEvent = function (event, files) {
        console.log(files);
        if (!files.profile[0]) {
            throw new ValidationException_1.ValidationException('Profile Is Required');
        }
        if (files.profile && files.images) {
            return this.service.createEvent(event, files.profile, files.images);
        }
        return this.service.createEvent(event, files.profile[0]);
    };
    EventController.prototype.updateEvent = function (id, event) {
        return this.service.updateEvent(id, event);
    };
    EventController.prototype.getEvents = function (query) {
        var data = this.service.getEvents(query);
        return data;
    };
    EventController.prototype.getEventById = function (id) {
        console.log(id);
        return this.service.getEventById(id);
    };
    EventController.prototype.deleteEvent = function (id) {
        return this.service.deleteEvent(id);
    };
    EventController.prototype.getPhoto = function (res, file) {
        var fileName = 'uploads/images/' + file;
        return rxjs_1.of(res.sendFile(path_1.join(process.cwd(), fileName)));
    };
    EventController.prototype.getDeletedEvent = function (query) {
        return this.service.getEvents(query, true);
    };
    EventController.prototype.addImages = function (id, images) {
        return this.service.addImage(id, images.filename);
    };
    EventController.prototype.getComment = function (id) {
        return this.commentService.getComment(id);
    };
    EventController.prototype.getLikes = function (id) {
        return this.likeService.getLikes(id);
    };
    __decorate([
        common_1.Post('/add'),
        common_1.UseGuards(JwtAuthGuard_1.JwtAuthGuard),
        common_1.UsePipes(common_1.ValidationPipe),
        common_1.UseInterceptors(file_fields_interceptor_1.FileFieldsInterceptor([
            { name: 'profile', maxCount: 1 },
            { name: 'images', maxCount: 15 },
        ], MulterConfig_1.MulterConfig)),
        Role_1.Role([UserRoles_1.UserRoles.USER]),
        __param(0, common_1.Body()),
        __param(1, common_1.UploadedFiles())
    ], EventController.prototype, "createEvent");
    __decorate([
        common_1.Patch('/:id'),
        common_1.UseGuards(JwtAuthGuard_1.JwtAuthGuard),
        common_1.UsePipes(common_1.ValidationPipe),
        Role_1.Role([UserRoles_1.UserRoles.USER]),
        __param(0, common_1.Param('id')), __param(1, common_1.Body())
    ], EventController.prototype, "updateEvent");
    __decorate([
        common_1.Get(),
        common_1.UseGuards(JwtAuthGuard_1.JwtAuthGuard),
        common_1.UsePipes(common_1.ValidationPipe),
        Role_1.Role([UserRoles_1.UserRoles.USER]),
        __param(0, common_1.Query())
    ], EventController.prototype, "getEvents");
    __decorate([
        common_1.Get(':id'),
        common_1.UseGuards(JwtAuthGuard_1.JwtAuthGuard),
        common_1.UsePipes(common_1.ValidationPipe),
        Role_1.Role([UserRoles_1.UserRoles.USER]),
        __param(0, common_1.Param('id'))
    ], EventController.prototype, "getEventById");
    __decorate([
        common_1.Delete(':id'),
        common_1.UseGuards(JwtAuthGuard_1.JwtAuthGuard),
        common_1.UsePipes(common_1.ValidationPipe),
        Role_1.Role([UserRoles_1.UserRoles.USER]),
        __param(0, common_1.Param('id'))
    ], EventController.prototype, "deleteEvent");
    __decorate([
        common_1.Get('/image/:file'),
        __param(0, common_1.Res()), __param(1, common_1.Param('file'))
    ], EventController.prototype, "getPhoto");
    __decorate([
        common_1.Get('deleted/event'),
        common_1.UseGuards(JwtAuthGuard_1.JwtAuthGuard),
        common_1.UsePipes(common_1.ValidationPipe),
        Role_1.Role([UserRoles_1.UserRoles.USER]),
        __param(0, common_1.Query())
    ], EventController.prototype, "getDeletedEvent");
    __decorate([
        common_1.Patch('addImage/:id'),
        common_1.UseGuards(JwtAuthGuard_1.JwtAuthGuard),
        common_1.UsePipes(common_1.ValidationPipe),
        common_1.UseInterceptors(file_interceptor_1.FileInterceptor('images', MulterConfig_1.MulterConfig)),
        Role_1.Role([UserRoles_1.UserRoles.USER]),
        __param(0, common_1.Param('id')), __param(1, common_1.UploadedFile())
    ], EventController.prototype, "addImages");
    __decorate([
        common_1.Get('comment/:id'),
        common_1.UseGuards(JwtAuthGuard_1.JwtAuthGuard),
        common_1.UsePipes(common_1.ValidationPipe),
        Role_1.Role([UserRoles_1.UserRoles.USER]),
        __param(0, common_1.Param('id'))
    ], EventController.prototype, "getComment");
    __decorate([
        common_1.Get('like/:id'),
        common_1.UseGuards(JwtAuthGuard_1.JwtAuthGuard),
        common_1.UsePipes(common_1.ValidationPipe),
        Role_1.Role([UserRoles_1.UserRoles.USER]),
        __param(0, common_1.Param('id'))
    ], EventController.prototype, "getLikes");
    EventController = __decorate([
        common_1.Controller('event')
    ], EventController);
    return EventController;
}());
exports.EventController = EventController;
