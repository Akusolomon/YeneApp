"use strict";
exports.__esModule = true;
exports.ChatSchema = void 0;
var mongoose_1 = require("mongoose");
var chatSchema = new mongoose_1.Schema({
    user: String
});
exports.ChatSchema = mongoose_1.model("Chat", chatSchema);
