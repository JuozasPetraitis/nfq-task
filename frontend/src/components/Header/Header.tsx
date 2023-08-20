import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { authState } from '../../store/slice/auth.slice';
import useAuth from '../../hooks/Auth/useAuth';

const Header = () => {
  const auth = useSelector(authState);
  const { logOutHandler } = useAuth();

  return (
    <div className={`flex ${!auth ? 'justify-between' : 'justify-end'} p-4`}>
      {!auth && (
        <>
          <Link
            to={'/'}
            className='text-lg py-2 px-8 bg-blue-600 text-white rounded'
          >
            Home
          </Link>
          <div className='flex gap-4'>
            <Link
              to={'/register'}
              className='text-lg py-2 px-8 bg-blue-600 text-white rounded'
            >
              Register
            </Link>
            <Link
              to={'/login'}
              className='text-lg py-2 px-8 bg-blue-600 text-white rounded'
            >
              Log in
            </Link>
          </div>
        </>
      )}

      {auth && (
        <div className='flex gap-4'>
          <button
            onClick={logOutHandler}
            className='text-lg py-2 px-8 bg-blue-600 text-white rounded'
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
