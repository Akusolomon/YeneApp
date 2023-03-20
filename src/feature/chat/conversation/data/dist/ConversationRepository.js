"use strict";
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
exports.ConversationRepository = void 0;
var DataNotFoundException_1 = require("./../../../../util/exception/DataNotFoundException");
var AuthenticatedUser_1 = require("./../../../users/domain/AuthenticatedUser");
var ConversationEntity_1 = require("./model/ConversationEntity");
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
var ConversationRepository = /** @class */ (function () {
    function ConversationRepository() {
    }
    ConversationRepository.prototype.createConversation = function (convo) {
        return __awaiter(this, void 0, void 0, function () {
            var conversation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        convo.user1 = AuthenticatedUser_1.AuthenticatedUser.getInstance().userId;
                        console.log(convo);
                        return [4 /*yield*/, ConversationEntity_1.ConversationEntity.findOne({
                                $or: [
                                    {
                                        $and: [{ user1: convo.user1 }, { user2: convo.user2 }]
                                    },
                                    {
                                        $and: [{ user1: convo.user2 }, { user2: convo.user1 }]
                                    },
                                ]
                            }).populate(['user1', 'user2'])];
                    case 1:
                        conversation = _a.sent();
                        console.log(conversation);
                        if (!conversation) return [3 /*break*/, 2];
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, ConversationEntity_1.ConversationEntity.create(convo)];
                    case 3:
                        conversation = _a.sent();
                        conversation = conversation.populate(['user1', 'user2']);
                        _a.label = 4;
                    case 4: return [2 /*return*/, conversation];
                }
            });
        });
    };
    ConversationRepository.prototype.getAllConversation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var convos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ConversationEntity_1.ConversationEntity.find({
                            $or: [
                                {
                                    user_1: AuthenticatedUser_1.AuthenticatedUser.getInstance().userId
                                },
                                {
                                    user_2: AuthenticatedUser_1.AuthenticatedUser.getInstance().userId
                                },
                            ]
                        }).populate(['user1', 'user2'])];
                    case 1:
                        convos = _a.sent();
                        return [2 /*return*/, convos];
                }
            });
        });
    };
    ConversationRepository.prototype.showConversation = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var convo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ConversationEntity_1.ConversationEntity.findById(id).populate([
                            'user1',
                            'user2',
                        ])];
                    case 1:
                        convo = _a.sent();
                        return [2 /*return*/, convo];
                }
            });
        });
    };
    ConversationRepository.prototype.deleteConversation = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, ConversationEntity_1.ConversationEntity.findByIdAndDelete(id)];
                    case 1:
                        _a.sent();
                        //TODO   await MessageEntity.deleteMany({ conversation_id: id });
                        return [2 /*return*/, 'deleted'];
                    case 2:
                        err_1 = _a.sent();
                        throw new DataNotFoundException_1.DataNotFoundException('Data Not Found');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ConversationRepository;
}());
exports.ConversationRepository = ConversationRepository;
