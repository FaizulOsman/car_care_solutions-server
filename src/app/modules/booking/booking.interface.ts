import { Model } from 'mongoose';

export type IBooking = {
  serviceId: string;
  dateTime: string;
};

// Booking Model
export type BookingModel = Model<IBooking, Record<string, unknown>>;

export type IBookingFilters = {
  searchTerm?: string;
  serviceId?: string;
  dateTime?: string;
};
