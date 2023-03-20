"use strict";
exports.__esModule = true;
exports.DatabaseFactory = void 0;
var EventGoingRepository_1 = require("./../feature/event_going/data/EventGoingRepository");
var CategoryRepository_1 = require("src/feature/categories/data/CategoryRepository");
var EventRepository_1 = require("./../feature/events/data/EventRepository");
var DataNotFoundException_1 = require("./../util/exception/DataNotFoundException");
var UserRepository_1 = require("src/feature/users/data/UserRepository");
var MomentRepository_1 = require("src/feature/moments/data/MomentRepository");
var FriendRequestRepository_1 = require("src/feature/friend_request/data/FriendRequestRepository");
var InviteRepository_1 = require("src/feature/invites/data/InviteRepository");
var CommentRepository_1 = require("src/feature/comments/data/CommentRepository");
var LikeRepository_1 = require("src/feature/likes/data/LikeRepository");
var ConversationRepository_1 = require("src/feature/chat/conversation/data/ConversationRepository");
var ChatRepository_1 = require("src/feature/chat/data/ChatRepository");
var DatabaseFactory = /** @class */ (function () {
    function DatabaseFactory() {
    }
    DatabaseFactory.getRepository = function (feature) {
        feature = feature.toUpperCase();
        var repository;
        switch (feature) {
            case 'USER':
                repository = new UserRepository_1.UserRepository();
                break;
            case 'COMMENT':
                repository = new CommentRepository_1.CommentRepository();
                break;
            case 'LIKE':
                repository = new LikeRepository_1.LikeRepository();
                break;
            case 'EVENT':
                repository = new EventRepository_1.EventRepository();
                break;
            case 'INVITE':
                repository = new InviteRepository_1.InviteRepository();
                break;
            case 'FRIEND':
                repository = new FriendRequestRepository_1.FriendRequestRepository();
                break;
            case 'CATEGORY':
                repository = new CategoryRepository_1.CategoryRepository();
                break;
            case 'MOMENT':
                repository = new MomentRepository_1.MomentRepository();
                break;
            case 'EVENTGOING':
                repository = new EventGoingRepository_1.EventGoingRepository();
                break;
            case 'CONVERSATION':
                repository = new ConversationRepository_1.ConversationRepository();
                break;
            case 'CHAT':
                repository = new ChatRepository_1.ChatRepository();
                break;
            default:
                throw new DataNotFoundException_1.DataNotFoundException('Repository not found');
        }
        return repository;
    };
    return DatabaseFactory;
}());
exports.DatabaseFactory = DatabaseFactory;
