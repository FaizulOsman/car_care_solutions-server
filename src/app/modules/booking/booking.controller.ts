/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from 'express';
import { BookingService } from './booking.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IBooking } from './booking.interface';
import { bookingFilterableFields } from './booking.constants';
import { paginationFields } from '../../../constants/pagination';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { pick } from '../../../shared/pick';
import { jwtHelpers } from '../../../helper/jwtHelpers';

// Create Booking
const createBooking: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const token: any = req.headers.authorization;
    const verifiedUser = jwtHelpers.verifyToken(
      token,
      config.jwt.secret as Secret
    );

    const { ...bookingData } = req.body;

    const result = await BookingService.createBooking(
      bookingData,
      verifiedUser
    );

    // Send Response
    sendResponse<IBooking>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Booking Created Successfully',
      data: result,
    });
  }
);

// Get all bookings
const getAllBookings: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, bookingFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await BookingService.getAllBookings(
      filters,
      paginationOptions
    );

    // Send Response
    sendResponse<IBooking[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Bookings retrieved Successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

// Get my bookings
const getMyBookings: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const token: any = req.headers.authorization;
    const verifiedUser = jwtHelpers.verifyToken(
      token,
      config.jwt.secret as Secret
    );

    const result = await BookingService.getMyBookings(verifiedUser);

    // Send Response
    sendResponse<IBooking[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Bookings retrieved Successfully',
      data: result,
    });
  }
);

// Get single Booking by id
const getSingleBooking: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await BookingService.getSingleBooking(id);

    // Send Response
    sendResponse<IBooking>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get Single Booking Successfully',
      data: result,
    });
  }
);

// Update Booking
const updateBooking: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await BookingService.updateBooking(id, updateData);

  sendResponse<IBooking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking updated successfully',
    data: result,
  });
});

// Delete Booking
const deleteBooking: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await BookingService.deleteBooking(id);

  sendResponse<IBooking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking deleted successfully',
    data: result,
  });
});

export const BookingController = {
  createBooking,
  getAllBookings,
  getMyBookings,
  getSingleBooking,
  updateBooking,
  deleteBooking,
};
