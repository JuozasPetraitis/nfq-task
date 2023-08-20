import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { authState } from '../store/slice/auth.slice';

const ProtectedOutlet = (): JSX.Element => {
  const isVerified = useSelector(authState);

  return isVerified ? <Outlet /> : <Navigate replace to={'/'} />;
};

export default ProtectedOutlet;
