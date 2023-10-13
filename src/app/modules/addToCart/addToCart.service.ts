/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { IAddToCart } from './addToCart.interface';
import { AddToCart } from './addToCart.model';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import ApiError from '../../../errors/apiError';
import { Service } from '../service/service.model';

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
const getAllAddToCarts = async (verifiedUser: any): Promise<any> => {
  const carts = await AddToCart.find({ email: verifiedUser?.email });

  const result = await Service.find({
    _id: carts.map(x => x.serviceId),
  });

  return result;
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
