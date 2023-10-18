import { z } from 'zod';

const createServiceZodValidation = z.object({
  body: z.object({
    type: z.string(),
    status: z.string().optional(),
    description: z.string().optional(),
    location: z.string().optional(),
    price: z.number(),
    facilities: z.array(z.string()).optional(),
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
    type: z.string().optional(),
    status: z.string().optional(),
    description: z.string().optional(),
    location: z.string().optional(),
    price: z.number().optional(),
    facilities: z.array(z.string()).optional(),
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
