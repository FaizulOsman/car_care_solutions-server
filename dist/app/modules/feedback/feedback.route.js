"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackRoutes = void 0;
const express_1 = __importDefault(require("express"));
const feedback_controller_1 = require("./feedback.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const feedback_validation_1 = require("./feedback.validation");
const router = express_1.default.Router();
// Routes
router.post('/create-feedback', (0, validateRequest_1.default)(feedback_validation_1.FeedbackValidation.createFeedbackZodValidation), feedback_controller_1.FeedbackController.createFeedback);
router.get('/:id', feedback_controller_1.FeedbackController.getSingleFeedback);
router.delete('/:id', feedback_controller_1.FeedbackController.deleteFeedback);
router.patch('/:id', (0, validateRequest_1.default)(feedback_validation_1.FeedbackValidation.updateFeedbackZodValidation), feedback_controller_1.FeedbackController.updateFeedback);
router.get('/', feedback_controller_1.FeedbackController.getAllFeedbacks);
exports.FeedbackRoutes = router;
