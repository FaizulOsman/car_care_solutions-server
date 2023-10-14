/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { SortOrder } from 'mongoose';
import { IBooking, IBookingFilters } from './booking.interface';
import { Booking } from './booking.model';
import httpStatus from 'http-status';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { bookingSearchableFields } from './booking.constants';
import { IGenericResponse } from '../../../interfaces/common';
import { User } from '../user/user.model';
import ApiError from '../../../errors/apiError';
import { paginationHelper } from '../../../helper/paginationHelper';

// Create Booking
const createBooking = async (
  payload: IBooking,
  verifiedUser: any
): Promise<IBooking | null> => {
  const user = await User.find({ _id: verifiedUser.id });
  if (user.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const alreadyBookedInThisTimeSlot = await Booking.find({
    $and: [
      { serviceId: payload?.serviceId },
      { date: payload?.date },
      { timeSlot: payload?.timeSlot },
    ],
  });
  if (alreadyBookedInThisTimeSlot?.length > 0) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Already Booked In this time slot'
    );
  }
  const result = await Booking.create(payload);
  return result;
};

// Get All Bookings (can also filter)
const getAllBookings = async (
  filters: IBookingFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBooking[]>> => {
  // Try not to use any
  const { searchTerm, ...filtersData } = filters;

  const andConditions = []; // Try not to use any

  if (searchTerm) {
    andConditions?.push({
      $or: bookingSearchableFields?.map(field => ({
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

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: '' | { [key: string]: SortOrder } = sortBy &&
    sortOrder && { [sortBy]: sortOrder };

  const whereCondition =
    andConditions?.length > 0 ? { $and: andConditions } : {};

  const result = await Booking.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Booking.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Get Single Booking
const getSingleBooking = async (id: string): Promise<IBooking | null> => {
  const result = await Booking.findById(id);

  return result;
};

const updateBooking = async (
  id: string,
  payload: Partial<IBooking>
): Promise<IBooking | null> => {
  const isExist = await Booking.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Booking not found');
  }

  const result = await Booking.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

// Delete Booking
const deleteBooking = async (id: string): Promise<IBooking | null> => {
  const result = await Booking.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Booking Not Found');
  }
  return result;
};

export const BookingService = {
  createBooking,
  getAllBookings,
  getSingleBooking,
  updateBooking,
  deleteBooking,
};
