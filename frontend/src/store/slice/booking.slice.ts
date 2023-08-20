import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import { Booking } from '../../interfaces/booking.interface';

const initialState = Array<Booking>;

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    getBookings: (state, { payload }: PayloadAction<any>) => {
      return payload;
    },
    setBookingStatus: (state, action) => {
      const { bookingId, newStatus } = action.payload;
      const bookingToUpdate = state.find(
        (booking) => booking._id === bookingId
      );
      if (bookingToUpdate) {
        bookingToUpdate.status = newStatus;
        return;
      }
    },
  },
});

export const { getBookings, setBookingStatus } = bookingsSlice.actions;
export default bookingsSlice.reducer;
export const bookingState = (state: RootState) => state.bookings;
