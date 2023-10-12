import express from 'express';
import { BookingController } from './booking.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { BookingValidation } from './booking.validation';
const router = express.Router();

// Routes
router.post(
  '/create-booking',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookingValidation.createBookingZodValidation),
  BookingController.createBooking
);

router.get('/:id', BookingController.getSingleBooking);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  BookingController.deleteBooking
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookingValidation.updateBookingZodValidation),
  BookingController.updateBooking
);

router.get('/', BookingController.getAllBookings);

export const BookingRoutes = router;
