import { Schema, model } from 'mongoose';
import { IAddToCart, AddToCartModel } from './addToCart.interface';

// AddToCart Schema
const AddToCartSchema = new Schema<IAddToCart, AddToCartModel>(
  {
    serviceId: {
      type: String,
      required: [false, 'serviceId is missing!'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const AddToCart = model<IAddToCart, AddToCartModel>(
  'AddToCart',
  AddToCartSchema
);
