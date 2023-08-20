const SERVER_ADDRESS = 'http://localhost:3001/api/';
const AUTH = 'auth';

const API_ENDPOINTS = {
  AUTH: {
    REGISTER: SERVER_ADDRESS + AUTH + '/register',
    LOGIN: SERVER_ADDRESS + AUTH + '/login',
    VERIFY_TOKEN: SERVER_ADDRESS + AUTH,
  },
  SPECIALIST: {
    GET_ALL: {
      POST_OFFICE: SERVER_ADDRESS + 'specialist/post_office',
      BANK: SERVER_ADDRESS + 'specialist/bank',
      HOSPITAL: SERVER_ADDRESS + 'specialist/hospital',
    },
  },
  BOOKING: {
    INDEX: SERVER_ADDRESS + 'booking',
    POST: SERVER_ADDRESS + 'booking',
    UPDATE_STATUS: SERVER_ADDRESS + 'booking',
    SPECIALIST_BOOKINGS: SERVER_ADDRESS + 'booking/specialist',
    CHECK_VISIT: SERVER_ADDRESS + 'booking/reservation',
    VISITS: SERVER_ADDRESS + 'booking/service',
    CANCEL_VISIT: SERVER_ADDRESS + 'booking',
  },
};

export { API_ENDPOINTS };
