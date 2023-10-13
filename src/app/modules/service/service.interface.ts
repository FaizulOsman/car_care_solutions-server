import { Model } from 'mongoose';

export type IReview = {
  name?: string;
  email?: string;
  rating?: number;
  review?: string;
};

export type IFeedback = {
  name?: string;
  email?: string;
  message?: string;
};

export type IService = {
  type: string;
  description?: string;
  location?: string;
  price: number;
  image?: string;
  facilities?: string[];
  feedbacks?: IFeedback[];
  reviews?: IReview[];
};

// Service Model
export type ServiceModel = Model<IService, Record<string, unknown>>;

export type IServiceFilters = {
  searchTerm?: string;
  type?: string;
  price?: string;
};
