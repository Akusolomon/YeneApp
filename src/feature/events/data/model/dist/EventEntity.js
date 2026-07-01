"use strict";
exports.__esModule = true;
exports.EventEntity = void 0;
var mongoose_1 = require("mongoose");
var eventSchema = new mongoose_1.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Event Must Have Title']
    },
    code: {
        type: Number
    },
    privacy: {
        type: Boolean,
        "default": false
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        trim: true,
        required: [true, 'Event Must Have Type']
    },
    startDate: {
        type: Date,
        required: [true, 'event Must Have startDate']
    },
    endDate: {
        type: Date,
        required: [true, 'event Must Have endDate']
    },
    city: {
        type: String,
        required: [true, 'event Must Have City']
    },
    venue: {
        type: String,
        "default": 'INFINITY'
    },
    fee: {
        type: Number,
        "default": 0
    },
    profile: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        "default": 0
    },
    images: [String],
    location: [Number],
    description: {
        type: String,
        trim: true
    },
    active: {
        type: Boolean,
        "default": true
    },
    createdAt: {
        type: Date,
        "default": Date.now
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
eventSchema.pre(/^find/, function (next) {
    if (this._conditions.active == false) {
        this.find({ active: { $ne: true } });
        next();
    }
    else {
        this.find({ active: { $ne: false } });
        next();
    }
});
//virtuals
eventSchema.virtual('comments', {
    ref: 'Comment',
    foreignField: 'commentedOn',
    localField: '_id'
});
eventSchema.virtual('likes', {
    ref: 'Like',
    foreignField: 'likedOn',
    localField: '_id'
});
eventSchema.virtual('moments', {
    ref: 'Moment',
    foreignField: 'event',
    localField: '_id'
});
eventSchema.virtual('eventgoing', {
    ref: 'EventGoing',
    foreignField: 'event',
    localField: '_id'
});
eventSchema.index({ title: 'text', venue: 'text' });
exports.EventEntity = mongoose_1.model('Event', eventSchema);
