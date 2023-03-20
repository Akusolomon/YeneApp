"use strict";
exports.__esModule = true;
exports.Message = void 0;
var mongoose_1 = require("mongoose");
var messageSchema = new mongoose_1.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    message: { type: String, required: true },
    conversation_id: { type: String, required: true },
    type: { type: String, "default": 'text' },
    seen: { type: Boolean, "default": 'false' }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
exports.Message = mongoose_1.model('Message', messageSchema);
messageSchema.virtual('sender', {
    ref: 'User',
    localField: 'from',
    foreignField: '_id',
    justOne: true
});
messageSchema.virtual('reciever', {
    ref: 'User',
    localField: 'to',
    foreignField: '_id',
    justOne: true
});
