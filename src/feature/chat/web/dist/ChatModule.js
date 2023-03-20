"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ChatModule = void 0;
var ChatService_1 = require("./../domain/ChatService");
var common_1 = require("@nestjs/common");
var ChatController_1 = require("./ChatController");
var ChatModule = /** @class */ (function () {
    function ChatModule() {
    }
    ChatModule = __decorate([
        common_1.Module({
            imports: [],
            controllers: [ChatController_1.ChatController],
            providers: [ChatService_1.ChatService]
        })
    ], ChatModule);
    return ChatModule;
}());
exports.ChatModule = ChatModule;
