import { Booking } from './types';

export default class BookingService {
  static async createBooking({
    firstName,
    phoneNumber,
    address,
    availability,
  }: Booking) {
    if (!firstName || !phoneNumber || !address || !availability) {
      throw new Error('Customer details are required');
    }

    // Mock booking logic, which can later be replaced with actual logic
    const bookingDetails = {
      confirmationMessage: `Your booking has been confirmed for the time slot {availability}`,
      availability,
    };

    return Promise.resolve(bookingDetails);
  }
}
