"use strict";
exports.__esModule = true;
exports.MomentEntity = void 0;
var mongoose_1 = require("mongoose");
var momentSchema = new mongoose_1.Schema({
    event: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    media: [String],
    post: { type: String, trim: true },
    createdAt: {
        type: Date,
        "default": Date.now
    },
    description: {
        type: String,
        trim: true
    },
    privacy: {
        type: Boolean,
        "default": false
    },
    active: {
        type: Boolean,
        "default": true
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
//virtuals
momentSchema.virtual('comments', {
    ref: 'Comment',
    foreignField: 'commentedOn',
    localField: '_id'
});
momentSchema.virtual('likes', {
    ref: 'Like',
    foreignField: 'likedOn',
    localField: '_id'
});
exports.MomentEntity = mongoose_1.model('Moment', momentSchema);
