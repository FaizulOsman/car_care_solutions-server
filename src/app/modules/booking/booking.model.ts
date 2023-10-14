import { Schema, model } from 'mongoose';
import { IBooking, BookingModel } from './booking.interface';

// Booking Schema
const BookingSchema = new Schema<IBooking, BookingModel>(
  {
    serviceId: {
      type: String,
      required: [true, 'serviceId is missing!'],
    },
    date: {
      type: String,
      required: [true, 'date is missing!'],
    },
    timeSlot: {
      type: String,
      required: [true, 'timeSlot is missing!'],
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
