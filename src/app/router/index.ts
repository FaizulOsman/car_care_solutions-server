import express from 'express';
import { AuthRouter } from '../modules/auth/auth.router';
import { UserRoutes } from '../modules/user/user.router';
import { ServiceRoutes } from '../modules/service/service.route';
import { BookingRoutes } from '../modules/booking/booking.route';
import { AddToCartRoutes } from '../modules/addToCart/addToCart.route';
import { ReviewRoutes } from '../modules/review/review.route';
import { FeedbackRoutes } from '../modules/feedback/feedback.route';
import { FaqRoutes } from '../modules/faq/faq.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRouter,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/services',
    route: ServiceRoutes,
  },
  {
    path: '/addToCart',
    route: AddToCartRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
  {
    path: '/feedbacks',
    route: FeedbackRoutes,
  },
  {
    path: '/faq',
    route: FaqRoutes,
  },
];

moduleRoutes?.forEach(route => router.use(route?.path, route?.route));

export default router;
