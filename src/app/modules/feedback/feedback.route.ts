import express from 'express';
import { FeedbackController } from './feedback.controller';
import validateRequest from '../../middlewares/validateRequest';
import { FeedbackValidation } from './feedback.validation';
const router = express.Router();

// Routes
router.post(
  '/create-feedback',
  validateRequest(FeedbackValidation.createFeedbackZodValidation),
  FeedbackController.createFeedback
);

router.get('/:id', FeedbackController.getSingleFeedback);

router.delete('/:id', FeedbackController.deleteFeedback);

router.patch(
  '/:id',
  validateRequest(FeedbackValidation.updateFeedbackZodValidation),
  FeedbackController.updateFeedback
);

router.get('/', FeedbackController.getAllFeedbacks);

export const FeedbackRoutes = router;
