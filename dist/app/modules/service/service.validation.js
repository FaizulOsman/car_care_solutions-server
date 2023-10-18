"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceValidation = void 0;
const zod_1 = require("zod");
const createServiceZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        type: zod_1.z.string(),
        status: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        location: zod_1.z.string().optional(),
        price: zod_1.z.number(),
        facilities: zod_1.z.array(zod_1.z.string()).optional(),
        reviews: zod_1.z
            .array(zod_1.z.object({
            name: zod_1.z.string(),
            email: zod_1.z.string(),
            rating: zod_1.z.number(),
            review: zod_1.z.string(),
        }))
            .optional(),
    }),
});
const updateServiceZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        type: zod_1.z.string().optional(),
        status: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        location: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        facilities: zod_1.z.array(zod_1.z.string()).optional(),
        reviews: zod_1.z
            .array(zod_1.z.object({
            name: zod_1.z.string(),
            email: zod_1.z.string(),
            rating: zod_1.z.number(),
            review: zod_1.z.string(),
        }))
            .optional(),
    }),
});
exports.ServiceValidation = {
    createServiceZodValidation,
    updateServiceZodValidation,
};
