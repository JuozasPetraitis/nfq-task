import { useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../utility/API/endpoints';
import { useDispatch, useSelector } from 'react-redux';
import { specialistState } from '../../store/slice/specialist.slice';
import {
  bookingState,
  setBookingStatus,
} from '../../store/slice/booking.slice';
import {
  XMarkIcon,
  CheckIcon,
  ClockIcon,
  FlagIcon,
} from '@heroicons/react/24/solid';
import { getBookings } from '../../store/slice/booking.slice';
import { Booking } from '../../interfaces/booking.interface';

const Profile = () => {
  const dispatch = useDispatch();
  const specialist = useSelector(specialistState);
  const bookings = useSelector(bookingState);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `${API_ENDPOINTS.BOOKING.SPECIALIST_BOOKINGS}/${specialist._id}`
        );

        dispatch(getBookings(response.data));
      } catch (error) {
        console.error('Error fetching specialists:', error);
      }
    };

    fetchBookings();
  }, [specialist]);

  useEffect(() => {
    return () => {
      dispatch(getBookings([]));
    };
  }, []);

  const getStatusColor = (status: any) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-200';
      case 'active':
        return 'bg-green-200';
      case 'finished':
        return 'bg-blue-200';
      case 'cancelled':
        return 'bg-red-200';
      default:
        return 'bg-gray-200';
    }
  };

  const renderIcon = (status: any) => {
    switch (status) {
      case 'pending':
        return <ClockIcon className='h-6 w-6 text-yellow-700' />;
      case 'active':
        return <CheckIcon className='h-6 w-6 text-green-700' />;
      case 'finished':
        return <FlagIcon className='h-6 w-6 text-blue-700' />;
      case 'cancelled':
        return <XMarkIcon className='h-6 w-6 text-red-700' />;
      default:
        return null;
    }
  };

  const handleSetToFinished = (bookingId: string, status: string) => {
    updateBookingStatus(bookingId, status);
  };

  const updateBookingStatus = async (bookingId: string, status: string) => {
    try {
      const response = await axios.put(
        `${API_ENDPOINTS.BOOKING.UPDATE_STATUS}/${bookingId}`
      );

      let newStatus;

      switch (status) {
        case 'pending':
          newStatus = 'active';
          break;
        case 'active':
          newStatus = 'finished';
          break;

        default:
          break;
      }

      if (response.status === 200) {
        dispatch(setBookingStatus({ bookingId, newStatus: newStatus }));
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  return (
    <div className='p-4 flex flex-col gap-8'>
      <h2 className='text-2xl font-semibold text-center'>Booking List</h2>
      {bookings.length >= 1 && (
        <ul>
          {bookings.map((booking: Booking) => (
            <li
              key={booking._id}
              className={`flex items-center p-2 rounded-lg shadow mb-2 ${getStatusColor(
                booking.status
              )}`}
            >
              <div className='mr-2'>{renderIcon(booking.status)}</div>
              <div className='mr-2'>Status: {booking.status}</div>
              <div className='flex-grow'>{booking.reservation_code}</div>

              {booking.status === 'active' && (
                <button
                  className='text-white bg-red-600 py-2 px-6'
                  onClick={() =>
                    handleSetToFinished(booking._id, booking.status)
                  }
                >
                  Set to finish
                </button>
              )}

              {!bookings.find((booking) => booking.status === 'active') &&
                booking.status !== 'cancelled' &&
                booking.status !== 'finished' && (
                  <button
                    className='text-white bg-lime-600 py-2 px-6'
                    onClick={() =>
                      handleSetToFinished(booking._id, booking.status)
                    }
                  >
                    Set to active
                  </button>
                )}
            </li>
          ))}
        </ul>
      )}
      {bookings.length <= 0 && (
        <p className='text-center font-semibold text-lg'>
          You have no bookings
        </p>
      )}
    </div>
  );
};

export default Profile;
