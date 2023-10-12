import express from 'express';
import { BookingController } from './booking.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BookingValidation } from './booking.validation';
const router = express.Router();

// Routes
router.post(
  '/create-booking',
  validateRequest(BookingValidation.createBookingZodValidation),
  BookingController.createBooking
);

router.get('/:id', BookingController.getSingleBooking);

router.delete('/:id', BookingController.deleteBooking);

router.patch(
  '/:id',
  validateRequest(BookingValidation.updateBookingZodValidation),
  BookingController.updateBooking
);

router.get('/', BookingController.getAllBookings);

export const BookingRoutes = router;
