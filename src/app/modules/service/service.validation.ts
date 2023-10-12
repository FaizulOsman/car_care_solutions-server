import { z } from 'zod';

const createServiceZodValidation = z.object({
  body: z.object({
    title: z.string(),
    description: z.string(),
    location: z.string(),
    price: z.number(),
    image: z.string().optional(),
    reviews: z
      .array(
        z.object({
          name: z.string(),
          email: z.string(),
          rating: z.number(),
          review: z.string(),
        })
      )
      .optional(),
  }),
});

const updateServiceZodValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    location: z.string().optional(),
    price: z.number().optional(),
    image: z.string().optional(),
    reviews: z
      .array(
        z.object({
          name: z.string(),
          email: z.string(),
          rating: z.number(),
          review: z.string(),
        })
      )
      .optional(),
  }),
});

export const ServiceValidation = {
  createServiceZodValidation,
  updateServiceZodValidation,
};
