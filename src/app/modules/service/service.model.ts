import { Schema, model } from 'mongoose';
import { IService, ServiceModel } from './service.interface';

// Service Schema
const ServiceSchema = new Schema<IService, ServiceModel>(
  {
    type: {
      type: String,
      required: [true, 'title is missing!'],
    },
    description: {
      type: String,
      required: [false, 'description is missing!'],
    },
    status: {
      type: String,
      required: [false, 'status is missing!'],
    },
    location: {
      type: String,
      required: [false, 'location is missing!'],
    },
    price: {
      type: Number,
      required: [true, 'price is missing!'],
    },
    facilities: {
      type: Array,
      required: [false, 'facilities is missing!'],
    },
    reviews: {
      type: Array,
      required: [false, 'reviews is missing!'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Service = model<IService, ServiceModel>('Service', ServiceSchema);
