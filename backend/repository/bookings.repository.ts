import { BookingModel } from '../model/booking.model';

export default class BookingRepository {
  public getBookingByReservationCode = async (reservationCode: string) => {
    try {
      const booking = await BookingModel.findOne({
        reservation_code: reservationCode,
      });

      return booking;
    } catch (error) {
      console.error('Error in getBookingByReservationCode:', error);
      throw error;
    }
  };

  public getBookingsBySpecialistId = async (specialistId: string) => {
    try {
      const activeBooking = await BookingModel.find({
        _id: specialistId,
      });

      return activeBooking;
    } catch (error) {
      console.error('Error in getBookingBySpecialistId:', error);
      throw error;
    }
  };

  public getBookingsByService = async (service: string) => {
    try {
      const activeBookings = await BookingModel.findOne({
        service: service,
        status: 'active',
      });

      if (activeBookings) {
        const pendingBookings = await BookingModel.find({
          service: service,
          status: 'pending',
        }).limit(6);

        const combinedBookings = [activeBookings, ...pendingBookings];

        return combinedBookings;
      } else {
        const pendingBookings = await BookingModel.find({
          service: service,
          status: 'pending',
        }).limit(7);

        return pendingBookings;
      }
    } catch (error) {
      console.error('Error in getBookingsByService:', error);
      throw error;
    }
  };

  public getBookingById = async (bookingId: string) => {
    try {
      const booking = await BookingModel.findOne({
        _id: bookingId,
      });

      return booking;
    } catch (error) {
      console.error('Error in getBookingBySpecialistId:', error);
      throw error;
    }
  };
}
