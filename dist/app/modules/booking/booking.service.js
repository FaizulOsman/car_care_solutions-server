"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const booking_model_1 = require("./booking.model");
const http_status_1 = __importDefault(require("http-status"));
const booking_constants_1 = require("./booking.constants");
const user_model_1 = require("../user/user.model");
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const paginationHelper_1 = require("../../../helper/paginationHelper");
// Create Booking
const createBooking = (payload, verifiedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.find({ _id: verifiedUser.id });
    if (user.length === 0) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const alreadyBookedInThisTimeSlot = yield booking_model_1.Booking.find({
        $and: [
            { serviceId: payload === null || payload === void 0 ? void 0 : payload.serviceId },
            { date: payload === null || payload === void 0 ? void 0 : payload.date },
            { timeSlot: payload === null || payload === void 0 ? void 0 : payload.timeSlot },
        ],
    });
    if ((alreadyBookedInThisTimeSlot === null || alreadyBookedInThisTimeSlot === void 0 ? void 0 : alreadyBookedInThisTimeSlot.length) > 0) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'Already Booked In this time slot');
    }
    const result = yield booking_model_1.Booking.create(payload);
    return result;
});
// Get All Bookings (can also filter)
const getAllBookings = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // Try not to use any
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = []; // Try not to use any
    if (searchTerm) {
        andConditions === null || andConditions === void 0 ? void 0 : andConditions.push({
            $or: booking_constants_1.bookingSearchableFields === null || booking_constants_1.bookingSearchableFields === void 0 ? void 0 : booking_constants_1.bookingSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => {
                return { [field]: value };
            }),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions);
    const sortCondition = sortBy &&
        sortOrder && { [sortBy]: sortOrder };
    const whereCondition = (andConditions === null || andConditions === void 0 ? void 0 : andConditions.length) > 0 ? { $and: andConditions } : {};
    const result = yield booking_model_1.Booking.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield booking_model_1.Booking.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// Get My Bookings
const getMyBookings = (verifiedUser) => __awaiter(void 0, void 0, void 0, function* () {
    let result = {};
    if ((verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.role) === 'admin' || (verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.role) === 'super_admin') {
        result = yield booking_model_1.Booking.find();
    }
    else {
        result = yield booking_model_1.Booking.find({ email: verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.email });
    }
    return result;
});
// Get Single Booking
const getSingleBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.findById(id);
    return result;
});
const updateBooking = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield booking_model_1.Booking.findOne({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'Booking not found');
    }
    const result = yield booking_model_1.Booking.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
// Delete Booking
const deleteBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.findByIdAndDelete(id);
    if (!result) {
        throw new apiError_1.default(http_status_1.default.FORBIDDEN, 'Booking Not Found');
    }
    return result;
});
exports.BookingService = {
    createBooking,
    getAllBookings,
    getMyBookings,
    getSingleBooking,
    updateBooking,
    deleteBooking,
};
