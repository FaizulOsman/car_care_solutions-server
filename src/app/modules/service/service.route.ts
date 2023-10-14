import express from 'express';
import { ServiceController } from './service.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceValidation } from './service.validation';
const router = express.Router();

// Routes
router.post(
  '/create-service',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(ServiceValidation.createServiceZodValidation),
  ServiceController.createService
);

router.get('/:id', ServiceController.getSingleService);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  ServiceController.deleteService
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(ServiceValidation.updateServiceZodValidation),
  ServiceController.updateService
);

router.patch(
  '/add-review/:id',
  validateRequest(ServiceValidation.updateServiceZodValidation),
  ServiceController.addReview
);

router.get('/', ServiceController.getAllServices);

export const ServiceRoutes = router;
