import express from 'express';
import { AddToCartController } from './addToCart.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { AddToCartValidation } from './addToCart.validation';
const router = express.Router();

// Routes
router.post(
  '/create-addToCart',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(AddToCartValidation.createAddToCartZodValidation),
  AddToCartController.createAddToCart
);

router.get('/:id', AddToCartController.getSingleAddToCart);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  AddToCartController.deleteAddToCart
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(AddToCartValidation.updateAddToCartZodValidation),
  AddToCartController.updateAddToCart
);

router.get('/', AddToCartController.getAllAddToCarts);

export const AddToCartRoutes = router;
