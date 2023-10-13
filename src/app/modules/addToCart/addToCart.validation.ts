import { z } from 'zod';

const createAddToCartZodValidation = z.object({
  body: z.object({
    serviceId: z.string(),
    email: z.string(),
  }),
});

const updateAddToCartZodValidation = z.object({
  body: z.object({
    serviceId: z.string().optional(),
    email: z.string().optional(),
  }),
});

export const AddToCartValidation = {
  createAddToCartZodValidation,
  updateAddToCartZodValidation,
};
