import { Model } from 'mongoose';

export type IFeedback = {
  name: string;
  email: string;
  message: string;
};

// Feedback Model
export type FeedbackModel = Model<IFeedback, Record<string, unknown>>;

export type IFeedbackFilters = {
  searchTerm?: string;
  message?: string;
};
