"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddToCart = void 0;
const mongoose_1 = require("mongoose");
// AddToCart Schema
const AddToCartSchema = new mongoose_1.Schema({
    serviceId: {
        type: String,
        required: [true, 'serviceId is missing!'],
    },
    email: {
        type: String,
        required: [true, 'email is missing!'],
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.AddToCart = (0, mongoose_1.model)('AddToCart', AddToCartSchema);
