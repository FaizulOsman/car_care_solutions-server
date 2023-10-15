"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const createBookingZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        serviceId: zod_1.z.string().optional(),
        type: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        email: zod_1.z.string().optional(),
        date: zod_1.z.string().optional(),
        timeSlot: zod_1.z.string().optional(),
        isAccepted: zod_1.z.boolean().optional(),
        isRejected: zod_1.z.boolean().optional(),
    }),
});
const updateBookingZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        serviceId: zod_1.z.string().optional(),
        type: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        email: zod_1.z.string().optional(),
        date: zod_1.z.string().optional(),
        timeSlot: zod_1.z.string().optional(),
        isAccepted: zod_1.z.boolean().optional(),
        isRejected: zod_1.z.boolean().optional(),
    }),
});
exports.BookingValidation = {
    createBookingZodValidation,
    updateBookingZodValidation,
};
