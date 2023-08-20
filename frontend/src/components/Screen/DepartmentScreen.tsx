import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../utility/API/endpoints';
import { useDispatch, useSelector } from 'react-redux';
import { bookingState } from '../../store/slice/booking.slice';
import {
  XMarkIcon,
  CheckIcon,
  ClockIcon,
  FlagIcon,
} from '@heroicons/react/24/solid';
import { getBookings } from '../../store/slice/booking.slice';
import { Booking } from '../../interfaces/booking.interface';

const DepartmentScreen = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('post_office');
  const bookings = useSelector(bookingState);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `${API_ENDPOINTS.BOOKING.VISITS}/${activeTab}`
        );

        dispatch(getBookings(response.data));
      } catch (error) {
        console.error('Error fetching specialists:', error);
      }
    };

    setTimeout(() => {
      fetchBookings();
    }, 3000);
  }, [activeTab]);

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

  const tabs = [
    { key: 'post_office', label: 'Post Office' },
    { key: 'bank', label: 'Bank' },
    { key: 'hospital', label: 'Hospital' },
  ];

  return (
    <div className='p-4 flex flex-col gap-8'>
      <div className='flex space-x-4'>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`py-2 px-5 border border-white rounded cursor-pointer transition-color duration-300 ${
              activeTab === tab.key && 'bg-blue-400 text-white'
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {bookings.length >= 1 && (
        <ul>
          {bookings &&
            bookings.map((booking: Booking) => (
              <li
                key={booking._id}
                className={`flex items-center p-2 rounded-lg shadow mb-2 ${getStatusColor(
                  booking.status
                )}`}
              >
                <div className='mr-2'>{renderIcon(booking.status)}</div>
                <div className='mr-2'>Status: {booking.status}</div>
                <div className='flex-grow'>{booking.reservation_code}</div>
              </li>
            ))}
        </ul>
      )}

      {bookings.length <= 0 && <p>No bookings in this service</p>}
    </div>
  );
};

export default DepartmentScreen;
