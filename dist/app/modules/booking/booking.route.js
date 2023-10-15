"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("./booking.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const booking_validation_1 = require("./booking.validation");
const router = express_1.default.Router();
// Routes
router.post('/create-booking', (0, validateRequest_1.default)(booking_validation_1.BookingValidation.createBookingZodValidation), booking_controller_1.BookingController.createBooking);
router.get('/my-bookings', booking_controller_1.BookingController.getMyBookings);
router.get('/:id', booking_controller_1.BookingController.getSingleBooking);
router.delete('/:id', booking_controller_1.BookingController.deleteBooking);
router.patch('/:id', (0, validateRequest_1.default)(booking_validation_1.BookingValidation.updateBookingZodValidation), booking_controller_1.BookingController.updateBooking);
router.get('/', booking_controller_1.BookingController.getAllBookings);
exports.BookingRoutes = router;
