import express from 'express';
import { AuthRouter } from '../modules/auth/auth.router';
import { UserRoutes } from '../modules/user/user.router';
import { ServiceRoutes } from '../modules/service/service.route';
import { BookingRoutes } from '../modules/booking/booking.route';
import { AddToCartRoutes } from '../modules/addToCart/addToCart.route';

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
];

moduleRoutes?.forEach(route => router.use(route?.path, route?.route));

export default router;
