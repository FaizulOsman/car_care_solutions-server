import { Schema, model } from 'mongoose';
import { IBooking, BookingModel } from './booking.interface';

// Booking Schema
const BookingSchema = new Schema<IBooking, BookingModel>(
  {
    serviceId: {
      type: String,
      required: [false, 'serviceId is missing!'],
    },
    dateTime: {
      type: String,
      required: [false, 'dateTime is missing!'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Booking = model<IBooking, BookingModel>('Booking', BookingSchema);
