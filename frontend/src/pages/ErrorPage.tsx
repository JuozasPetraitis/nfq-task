import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = (): JSX.Element => {
  return (
    <div className='flex h-screen flex-col items-center justify-center text-8xl font-semibold'>
      <p>Error - 404</p>
      <p>Page Not Found</p>
      <Link
        to={'/'}
        className='text-lg py-2 px-8 bg-blue-600 text-white rounded'
      >
        Go to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
