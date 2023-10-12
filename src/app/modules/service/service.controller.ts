/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestHandler, Response } from 'express';
import { ServiceService } from './service.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IService } from './service.interface';
import { serviceFilterableFields } from './service.constants';
import { paginationFields } from '../../../constants/pagination';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { pick } from '../../../shared/pick';
import { jwtHelpers } from '../../../helper/jwtHelpers';

// Create Service
const createService: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const token: any = req.headers.authorization;
    const verifiedUser = jwtHelpers.verifyToken(
      token,
      config.jwt.secret as Secret
    );

    const { ...serviceData } = req.body;

    const result = await ServiceService.createService(
      serviceData,
      verifiedUser
    );

    // Send Response
    sendResponse<IService>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Service Created Successfully',
      data: result,
    });
  }
);

// Get all services
const getAllServices: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, serviceFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await ServiceService.getAllServices(
      filters,
      paginationOptions
    );

    // Send Response
    sendResponse<IService[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Services retrieved Successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

// Get single Service by id
const getSingleService: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await ServiceService.getSingleService(id);

    // Send Response
    sendResponse<IService>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get Single Service Successfully',
      data: result,
    });
  }
);

// Update Service
const updateService: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await ServiceService.updateService(id, updateData);

  sendResponse<IService>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service updated successfully',
    data: result,
  });
});

// Delete Service
const deleteService: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await ServiceService.deleteService(id);

  sendResponse<IService>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service deleted successfully',
    data: result,
  });
});

// Add Review
export const addReview: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await ServiceService.addReview(id, updateData);

  sendResponse<IService>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review added successfully',
    data: result,
  });
});

export const ServiceController = {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
  addReview,
};
