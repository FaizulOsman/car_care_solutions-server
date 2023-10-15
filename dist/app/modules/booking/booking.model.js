"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
// Booking Schema
const BookingSchema = new mongoose_1.Schema({
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
    email: {
        type: String,
        required: [true, 'email is missing!'],
    },
    date: {
        type: String,
        required: [true, 'date is missing!'],
    },
    timeSlot: {
        type: String,
        required: [true, 'timeSlot is missing!'],
    },
    isAccepted: {
        type: Boolean,
        required: [true, 'isAccepted is missing!'],
    },
    isRejected: {
        type: Boolean,
        required: [true, 'isRejected is missing!'],
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Booking = (0, mongoose_1.model)('Booking', BookingSchema);
