"use strict";
exports.__esModule = true;
exports.EventGoingEntity = void 0;
var mongoose_1 = require("mongoose");
var eventGoingSchema = new mongoose_1.Schema({
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
    ticketNo: {
        type: String
    },
    isAttended: {
        type: Boolean,
        "default": false
    },
    createdAt: {
        type: Date,
        "default": Date.now
    }
});
eventGoingSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user'
    });
    next();
});
exports.EventGoingEntity = mongoose_1.model('EventGoing', eventGoingSchema);
// eventGoingSchema.methods.createTicketNo = function () {
//     const resetToken = randomBytes(32).toString('hex') + Date.now().toString()
//     return resetToken
//   }
