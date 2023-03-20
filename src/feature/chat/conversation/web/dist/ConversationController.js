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
exports.ConversationController = void 0;
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
var ConversatioService_1 = require("./../domain/ConversatioService");
var common_1 = require("@nestjs/common");
var DatabaseFactory_1 = require("src/database/DatabaseFactory");
var JwtAuthGuard_1 = require("src/util/auth/jwt/JwtAuthGuard");
var ConversationController = /** @class */ (function () {
    function ConversationController() {
        this.service = new ConversatioService_1.ConversationService();
        this.service = DatabaseFactory_1.DatabaseFactory.getRepository('conversation');
    }
    ConversationController.prototype.createConversation = function (convo, id) {
        convo.user2 = id;
        return this.service.createConversation(convo);
    };
    __decorate([
        common_1.Post(':id/add'),
        common_1.UseGuards(JwtAuthGuard_1.JwtAuthGuard),
        common_1.UsePipes(common_1.ValidationPipe),
        __param(0, common_1.Body()), __param(1, common_1.Param('id'))
    ], ConversationController.prototype, "createConversation");
    ConversationController = __decorate([
        common_1.Controller('conversation')
    ], ConversationController);
    return ConversationController;
}());
exports.ConversationController = ConversationController;
