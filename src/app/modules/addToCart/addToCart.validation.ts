import { z } from 'zod';

const createAddToCartZodValidation = z.object({
  body: z.object({
    serviceId: z.string().optional(),
  }),
});

const updateAddToCartZodValidation = z.object({
  body: z.object({
    serviceId: z.string().optional(),
  }),
});

export const AddToCartValidation = {
  createAddToCartZodValidation,
  updateAddToCartZodValidation,
};
