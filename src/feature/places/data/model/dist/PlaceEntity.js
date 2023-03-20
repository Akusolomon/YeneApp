"use strict";
exports.__esModule = true;
exports.PlaceEntity = void 0;
var mongoose_1 = require("mongoose");
var placeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: true
    }
});
exports.PlaceEntity = mongoose_1.model('Place', placeSchema);
