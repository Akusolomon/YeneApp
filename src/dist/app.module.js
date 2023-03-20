"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var ChatModule_1 = require("./feature/chat/web/ChatModule");
var ConversationModule_1 = require("./feature/chat/conversation/web/ConversationModule");
var LikeModule_1 = require("./feature/likes/web/LikeModule");
var CommentModule_1 = require("./feature/comments/web/CommentModule");
var InviteModule_1 = require("./feature/invites/web/InviteModule");
var EventGoingModule_1 = require("./feature/event_going/web/EventGoingModule");
var MomentModule_1 = require("./feature/moments/web/MomentModule");
var common_1 = require("@nestjs/common");
var passport_1 = require("@nestjs/passport");
var CategoryModule_1 = require("./feature/categories/web/CategoryModule");
var EventModule_1 = require("./feature/events/web/EventModule");
var UserModule_1 = require("./feature/users/web/UserModule");
var JwtStrategy_1 = require("./util/auth/jwt/JwtStrategy");
var FriendRequestModule_1 = require("./feature/friend_request/web/FriendRequestModule");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [
                ChatModule_1.ChatModule,
                ConversationModule_1.ConversationModule,
                LikeModule_1.LikeModule,
                CommentModule_1.CommentModule,
                InviteModule_1.InviteModule,
                EventGoingModule_1.EventGoingModule,
                FriendRequestModule_1.FriendRequestModule,
                MomentModule_1.MomentModule,
                CategoryModule_1.CategoryModule,
                EventModule_1.EventModule,
                UserModule_1.UserModule,
                passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            ],
            controllers: [],
            providers: [JwtStrategy_1.JwtStrategy]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
