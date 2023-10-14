import { Model } from 'mongoose';

export type IReview = {
  name?: string;
  email?: string;
  rating?: number;
  review?: string;
};

export type IService = {
  type: string;
  description?: string;
  location?: string;
  price: number;
  image?: string;
  facilities?: string[];
  reviews?: IReview[];
};

// Service Model
export type ServiceModel = Model<IService, Record<string, unknown>>;

export type IServiceFilters = {
  searchTerm?: string;
  type?: string;
  price?: string;
};
