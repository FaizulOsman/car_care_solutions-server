import { Schema, model } from 'mongoose';
import { IReview, ReviewModel } from './review.interface';

// Review Schema
const ReviewSchema = new Schema<IReview, ReviewModel>(
  {
    serviceId: {
      type: String,
      required: [true, 'serviceId is missing!'],
    },
    type: {
      type: String,
      required: [true, 'type is missing!'],
    },
    price: {
      type: String,
      required: [true, 'price is missing!'],
    },
    email: {
      type: String,
      required: [true, 'email is missing!'],
    },
    rating: {
      type: Number,
      required: [true, 'rating is missing!'],
    },
    review: {
      type: String,
      required: [true, 'review is missing!'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Review = model<IReview, ReviewModel>('Review', ReviewSchema);
