import { Schema, model } from 'mongoose';
import { IBooking, BookingModel } from './booking.interface';

// Booking Schema
const BookingSchema = new Schema<IBooking, BookingModel>(
  {
    serviceId: {
      type: String,
      required: [true, 'serviceId is missing!'],
    },
    type: {
      type: String,
      required: [true, 'type is missing!'],
    },
    price: {
      type: Number,
      required: [true, 'price is missing!'],
    },
    email: {
      type: String,
      required: [true, 'email is missing!'],
    },
    date: {
      type: String,
      required: [true, 'date is missing!'],
    },
    timeSlot: {
      type: String,
      required: [true, 'timeSlot is missing!'],
    },
    isAccepted: {
      type: Boolean,
      required: [true, 'isAccepted is missing!'],
    },
    isRejected: {
      type: Boolean,
      required: [true, 'isRejected is missing!'],
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
