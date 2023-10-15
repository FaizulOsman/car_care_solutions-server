"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
// Review Schema
const ReviewSchema = new mongoose_1.Schema({
    serviceId: {
        type: String,
        required: [true, 'serviceId is missing!'],
    },
    type: {
        type: String,
        required: [true, 'type is missing!'],
    },
    price: {
        type: Number,
        required: [true, 'price is missing!'],
    },
    name: {
        type: String,
        required: [true, 'name is missing!'],
    },
    email: {
        type: String,
        required: [true, 'email is missing!'],
    },
    rating: {
        type: Number,
        required: [true, 'rating is missing!'],
    },
    review: {
        type: String,
        required: [true, 'review is missing!'],
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Review = (0, mongoose_1.model)('Review', ReviewSchema);
