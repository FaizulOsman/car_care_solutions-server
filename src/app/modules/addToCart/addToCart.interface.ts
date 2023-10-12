import { Model } from 'mongoose';

export type IAddToCart = {
  serviceId: string;
};

// AddToCart Model
export type AddToCartModel = Model<IAddToCart, Record<string, unknown>>;

export type IAddToCartFilters = {
  searchTerm?: string;
  serviceId?: string;
};
