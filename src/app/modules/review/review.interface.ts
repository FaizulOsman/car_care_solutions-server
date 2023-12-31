import { Model } from 'mongoose';

export type IReview = {
  serviceId: string;
  type: string;
  price: number;
  name: string;
  email: string;
  rating: number;
  review: string;
};

// Review Model
export type ReviewModel = Model<IReview, Record<string, unknown>>;

export type IReviewFilters = {
  searchTerm?: string;
  rating?: string;
  review?: string;
};
