"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const mongoose_1 = require("mongoose");
// Service Schema
const ServiceSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: [true, 'title is missing!'],
    },
    description: {
        type: String,
        required: [false, 'description is missing!'],
    },
    location: {
        type: String,
        required: [false, 'location is missing!'],
    },
    price: {
        type: Number,
        required: [true, 'price is missing!'],
    },
    image: {
        type: String,
        required: [false, 'image is missing!'],
    },
    facilities: {
        type: Array,
        required: [false, 'facilities is missing!'],
    },
    reviews: {
        type: Array,
        required: [false, 'reviews is missing!'],
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Service = (0, mongoose_1.model)('Service', ServiceSchema);
