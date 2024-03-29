/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { SortOrder } from 'mongoose';
import { IFeedback, IFeedbackFilters } from './feedback.interface';
import { Feedback } from './feedback.model';
import httpStatus from 'http-status';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { feedbackSearchableFields } from './feedback.constants';
import { IGenericResponse } from '../../../interfaces/common';
import { User } from '../user/user.model';
import ApiError from '../../../errors/apiError';
import { paginationHelper } from '../../../helper/paginationHelper';

// Create Feedback
const createFeedback = async (
  payload: IFeedback,
  verifiedUser: any
): Promise<IFeedback | null> => {
  const user = await User.find({ _id: verifiedUser.id });
  if (user.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await Feedback.create(payload);
  return result;
};

// Get All Feedbacks (can also filter)
const getAllFeedbacks = async (
  filters: IFeedbackFilters,
  paginationOptions: IPaginationOptions,
  verifiedUser: any
): Promise<IGenericResponse<IFeedback[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);
  const sortCondition: null | { [key: string]: SortOrder } =
    sortBy && sortOrder ? { [sortBy]: sortOrder } : null;

  const andConditions = [];

  if (searchTerm) {
    const searchConditions = feedbackSearchableFields?.map(field => ({
      [field]: {
        $regex: searchTerm,
        $options: 'i',
      },
    }));
    andConditions.push({ $or: searchConditions });
  }

  if (Object.keys(filtersData).length > 0) {
    const filterConditions = Object.entries(filtersData).map(
      ([field, value]) => ({ [field]: value })
    );
    andConditions.push({ $and: filterConditions });
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  let result: IFeedback[] = [];

  if (verifiedUser?.role === 'admin' || verifiedUser?.role === 'super_admin') {
    result = await Feedback.find(whereCondition)
      .sort(sortCondition)
      .skip(skip)
      .limit(limit);
  } else {
    result = await Feedback.find({
      ...whereCondition,
      email: verifiedUser?.email,
    })
      .sort(sortCondition)
      .skip(skip)
      .limit(limit);
  }

  const total = await Feedback.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// Get Single Feedback
const getSingleFeedback = async (id: string): Promise<IFeedback | null> => {
  const result = await Feedback.findById(id);

  return result;
};

const updateFeedback = async (
  id: string,
  payload: Partial<IFeedback>
): Promise<IFeedback | null> => {
  const isExist = await Feedback.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Feedback not found');
  }

  const result = await Feedback.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

// Delete Feedback
const deleteFeedback = async (id: string): Promise<IFeedback | null> => {
  const result = await Feedback.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Feedback Not Found');
  }
  return result;
};

export const FeedbackService = {
  createFeedback,
  getAllFeedbacks,
  getSingleFeedback,
  updateFeedback,
  deleteFeedback,
};
