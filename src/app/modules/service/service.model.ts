import { Schema, model } from 'mongoose';
import { IService, ServiceModel } from './service.interface';

// Service Schema
const ServiceSchema = new Schema<IService, ServiceModel>(
  {
    title: {
      type: String,
      required: [true, 'title is missing!'],
    },
    description: {
      type: String,
      required: [true, 'description is missing!'],
    },
    location: {
      type: String,
      required: [true, 'location is missing!'],
    },
    price: {
      type: Number,
      required: [true, 'price is missing!'],
    },
    image: {
      type: String,
      required: [false, 'image is missing!'],
    },
    feedbacks: {
      type: Array,
      required: [false, 'feedback is missing!'],
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
