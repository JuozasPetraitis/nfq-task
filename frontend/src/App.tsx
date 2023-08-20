import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import RegisterPage from './pages/Auth/RegisterPage/RegisterPage';
import LoginPage from './pages/Auth/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import ProtectedOutlet from './utility/ProtectedOutlet';
import ProfilePage from './pages/Profile/ProfilePage';
import { useEffect } from 'react';
import useAuth from './hooks/Auth/useAuth';
import ErrorPage from './pages/ErrorPage';

const App = () => {
  const { verifyToken } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const verify = async () => {
      try {
        const isTokenVerified = await verifyToken();
        if (isTokenVerified) {
          navigate(pathname);
        }
      } catch (error) {
        console.error('Error verifying token:', error);
      }
    };

    verify();
  }, [pathname]);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route element={<ProtectedOutlet />}>
          <Route path='/profile' element={<ProfilePage />} />
        </Route>
      </Route>
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
