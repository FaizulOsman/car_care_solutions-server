"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
const createReviewZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        serviceId: zod_1.z.string(),
        type: zod_1.z.string(),
        price: zod_1.z.number(),
        name: zod_1.z.string(),
        email: zod_1.z.string(),
        rating: zod_1.z.number(),
        review: zod_1.z.string(),
    }),
});
const updateReviewZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        serviceId: zod_1.z.string().optional(),
        type: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        rating: zod_1.z.number().optional(),
        review: zod_1.z.string().optional(),
    }),
});
exports.ReviewValidation = {
    createReviewZodValidation,
    updateReviewZodValidation,
};
