import { Schema, model } from 'mongoose';
import { IReview, ReviewModel } from './review.interface';

// Review Schema
const ReviewSchema = new Schema<IReview, ReviewModel>(
  {
    name: {
      type: String,
      required: [true, 'name is missing!'],
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
