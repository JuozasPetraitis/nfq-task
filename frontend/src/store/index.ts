import { configureStore } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import specialistReducer from './slice/specialist.slice';
import authReducer from './slice/auth.slice';
import bookingsReducer from './slice/booking.slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    specialist: specialistReducer,
    bookings: bookingsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
