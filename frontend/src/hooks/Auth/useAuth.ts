import axios, { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { API_ENDPOINTS } from '../../utility/API/endpoints';
import {
  LogInFormValues,
  RegisterFormValues,
} from '../../interfaces/auth.interface';
import { getUser } from '../../store/slice/specialist.slice';
import { isVerified } from '../../store/slice/auth.slice';

const useAuth = () => {
  const dispatch = useDispatch();

  const registerHandler = async (formData: RegisterFormValues) => {
    try {
      const response = await axios.post(API_ENDPOINTS.AUTH.REGISTER, formData);
      const { data } = response;
      const { accessToken } = data;
      localStorage.setItem('accessToken', accessToken);
      dispatch(getUser(data));
      dispatch(isVerified(true));
      return true;
    } catch (error) {
      const errors = error as AxiosError;
      console.error('errors', errors);
      return false;
    }
  };

  const logInHandler = async (logInFormValues: LogInFormValues) => {
    try {
      const response = await axios.post(
        API_ENDPOINTS.AUTH.LOGIN,
        logInFormValues
      );
      const { data } = response;
      const { accessToken } = data;
      localStorage.setItem('accessToken', accessToken);
      dispatch(getUser(data));
      dispatch(isVerified(true));
      return true;
    } catch (error) {
      const errors = error as AxiosError;
      console.error(errors);
      return false;
    }
  };

  const logOutHandler = () => {
    localStorage.clear();
    dispatch(isVerified(false));
  };

  const verifyToken = async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      localStorage.clear();
      dispatch(isVerified(false));
      return false;
    }

    try {
      const response = await axios.get(API_ENDPOINTS.AUTH.VERIFY_TOKEN, {
        headers: {
          Authorization: accessToken,
        },
      });
      const { data } = response;
      dispatch(getUser(data));
      dispatch(isVerified(true));

      return true;
    } catch (error) {
      localStorage.clear();
      dispatch(isVerified(false));
      const errors = error as AxiosError;
      console.error(errors);
      return false;
    }
  };

  return {
    registerHandler,
    logInHandler,
    logOutHandler,
    verifyToken,
  };
};

export default useAuth;
