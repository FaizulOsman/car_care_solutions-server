/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { SortOrder } from 'mongoose';
import { IAddToCart, IAddToCartFilters } from './addToCart.interface';
import { AddToCart } from './addToCart.model';
import httpStatus from 'http-status';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { addToCartSearchableFields } from './addToCart.constants';
import { IGenericResponse } from '../../../interfaces/common';
import { User } from '../user/user.model';
import ApiError from '../../../errors/apiError';
import { paginationHelper } from '../../../helper/paginationHelper';

// Create AddToCart
const createAddToCart = async (
  payload: IAddToCart,
  verifiedUser: any
): Promise<IAddToCart | null> => {
  const user = await User.find({ _id: verifiedUser.id });
  if (user.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await AddToCart.create(payload);
  return result;
};

// Get All AddToCarts (can also filter)
const getAllAddToCarts = async (
  filters: IAddToCartFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAddToCart[]>> => {
  // Try not to use any
  const { searchTerm, ...filtersData } = filters;

  const andConditions = []; // Try not to use any

  if (searchTerm) {
    andConditions?.push({
      $or: addToCartSearchableFields?.map(field => ({
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

  const result = await AddToCart.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await AddToCart.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Get Single AddToCart
const getSingleAddToCart = async (id: string): Promise<IAddToCart | null> => {
  const result = await AddToCart.findById(id);

  return result;
};

const updateAddToCart = async (
  id: string,
  payload: Partial<IAddToCart>
): Promise<IAddToCart | null> => {
  const isExist = await AddToCart.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'AddToCart not found');
  }

  const result = await AddToCart.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

// Delete AddToCart
const deleteAddToCart = async (id: string): Promise<IAddToCart | null> => {
  const result = await AddToCart.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.FORBIDDEN, 'AddToCart Not Found');
  }
  return result;
};

export const AddToCartService = {
  createAddToCart,
  getAllAddToCarts,
  getSingleAddToCart,
  updateAddToCart,
  deleteAddToCart,
};
