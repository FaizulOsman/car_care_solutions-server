import { z } from 'zod';

const createReviewZodValidation = z.object({
  body: z.object({
    serviceId: z.string(),
    type: z.string(),
    price: z.number(),
    name: z.string(),
    email: z.string(),
    rating: z.number(),
    review: z.string(),
  }),
});

const updateReviewZodValidation = z.object({
  body: z.object({
    serviceId: z.string().optional(),
    type: z.string().optional(),
    price: z.number().optional(),
    name: z.string().optional(),
    email: z.string().optional(),
    rating: z.number().optional(),
    review: z.string().optional(),
  }),
});

export const ReviewValidation = {
  createReviewZodValidation,
  updateReviewZodValidation,
};
