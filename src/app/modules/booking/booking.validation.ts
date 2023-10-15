import { z } from 'zod';

const createBookingZodValidation = z.object({
  body: z.object({
    serviceId: z.string().optional(),
    type: z.string().optional(),
    price: z.number().optional(),
    email: z.string().optional(),
    date: z.string().optional(),
    timeSlot: z.string().optional(),
    isAccepted: z.boolean().optional(),
    isRejected: z.boolean().optional(),
  }),
});

const updateBookingZodValidation = z.object({
  body: z.object({
    serviceId: z.string().optional(),
    type: z.string().optional(),
    price: z.number().optional(),
    email: z.string().optional(),
    date: z.string().optional(),
    timeSlot: z.string().optional(),
    isAccepted: z.boolean().optional(),
    isRejected: z.boolean().optional(),
  }),
});

export const BookingValidation = {
  createBookingZodValidation,
  updateBookingZodValidation,
};
