"use strict";
exports.__esModule = true;
exports.ConversationEntity = void 0;
var mongoose_1 = require("mongoose");
var conversationSchema = new mongoose_1.Schema({
    user1: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    user2: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
exports.ConversationEntity = mongoose_1.model('Conversation', conversationSchema);
