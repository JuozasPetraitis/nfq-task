import { useEffect, useState } from 'react';
import { useForm, FormProvider, FieldErrors } from 'react-hook-form';
import { Label } from './FormFields';
import axios, { AxiosError } from 'axios';
import { API_ENDPOINTS } from '../../utility/API/endpoints';
import { Specialist } from '../../interfaces/specialist.interface';

export type BookVisitFormValues = {
  email: string;
};

const BookVisitForm = (): JSX.Element => {
  const [errorMessageFromServer, setErrorMessageFromServer] = useState<any>();
  const [specialists, setSpecialists] = useState<Array<Specialist>>([]);
  const methods = useForm<BookVisitFormValues>({ mode: 'all' });
  const [service, setService] = useState('post_office');
  const [reservationCode, setreservationCode] = useState<string>();

  useEffect(() => {
    setreservationCode('');
  }, [service]);

  const onSubmit = async (data: BookVisitFormValues) => {
    try {
      const response = await axios.post(API_ENDPOINTS.BOOKING.POST, data);
      setreservationCode(response.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      setErrorMessageFromServer(axiosError.response?.data);
      setTimeout(() => {
        setErrorMessageFromServer(errorMessageFromServer);
        methods.reset();
      }, 8000);
    }
  };

  const onError = (errors: FieldErrors) => {
    methods.reset();
    console.error(errors);
  };

  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        let API_URL = API_ENDPOINTS.SPECIALIST.GET_ALL.POST_OFFICE;
        switch (service) {
          case 'post_office':
            API_URL = API_ENDPOINTS.SPECIALIST.GET_ALL.POST_OFFICE;
            break;
          case 'bank':
            API_URL = API_ENDPOINTS.SPECIALIST.GET_ALL.BANK;
            break;
          case 'hospital':
            API_URL = API_ENDPOINTS.SPECIALIST.GET_ALL.HOSPITAL;
            break;
          default:
            break;
        }
        const response = await axios.get(API_URL);
        setSpecialists(response.data);
      } catch (error) {
        console.error('Error fetching specialists:', error);
      }
    };

    fetchSpecialists();
  }, [service]);

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex space-x-8'>
        <button
          className={`py-2 px-5 border border-white rounded cursor-pointer transition-color duration-300 ${
            service === 'post_office' && 'bg-blue-400 text-white'
          }`}
          onClick={() => setService('post_office')}
        >
          Post Office
        </button>
        <button
          className={`py-2 px-5 border border-white rounded cursor-pointer transition-color duration-300 ${
            service === 'bank' && 'bg-blue-400 text-white'
          }`}
          onClick={() => setService('bank')}
        >
          Bank
        </button>
        <button
          className={`py-2 px-5 border border-white rounded cursor-pointer transition-color duration-300 ${
            service === 'hospital' && 'bg-blue-400 text-white'
          }`}
          onClick={() => setService('hospital')}
        >
          Hospital
        </button>
      </div>

      {specialists.length > 0 && (
        <FormProvider {...methods}>
          <form
            className='mx-auto flex w-4/5 flex-col gap-4'
            onSubmit={methods.handleSubmit(onSubmit, onError)}
          >
            <Label name='Specialist' />
            <select
              {...methods.register('email', { required: true })}
              className='rounded-sm border border-gray-400 bg-gray-50 placeholder:text-gray-400 px-4 py-4'
            >
              {specialists &&
                specialists.map((specialist: Specialist) => {
                  return (
                    <option value={specialist.email}>
                      {specialist.fullName}
                    </option>
                  );
                })}
            </select>

            <input
              type='submit'
              value='Book visit'
              className={`mt-4 py-2 rounded-lg ${
                methods.formState.isValid
                  ? 'cursor-pointer bg-lime-500 text-black hover:bg-lime-600 hover:text-white duration-300'
                  : 'cursor-not-allowed bg-rose-300 text-white'
              }`}
              disabled={!methods.formState.isValid}
            />
          </form>
        </FormProvider>
      )}

      {specialists.length <= 0 && (
        <FormProvider {...methods}>
          <p className='text-center font-bold'>
            No specialists have been registered to this service
          </p>
        </FormProvider>
      )}

      {errorMessageFromServer?.message && (
        <p className='py-8 text-center text-lg text-red-600 font-medium'>
          {errorMessageFromServer.message}
        </p>
      )}

      {reservationCode && (
        <p className='text-lg text-center'>
          This is your reservation code:{' '}
          <span className='font-bold'>{reservationCode}</span>
        </p>
      )}
    </div>
  );
};

export default BookVisitForm;
