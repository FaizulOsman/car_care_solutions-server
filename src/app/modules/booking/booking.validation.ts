import { z } from 'zod';

const createBookingZodValidation = z.object({
  body: z.object({
    serviceId: z.string().optional(),
    dateTime: z.string().optional(),
  }),
});

const updateBookingZodValidation = z.object({
  body: z.object({
    serviceId: z.string().optional(),
    dateTime: z.string().optional(),
  }),
});

export const BookingValidation = {
  createBookingZodValidation,
  updateBookingZodValidation,
};
