import { useState } from 'react';
import { useForm, FormProvider, FieldErrors } from 'react-hook-form';
import { Input, Label } from './FormFields';
import axios, { AxiosError } from 'axios';
import { API_ENDPOINTS } from '../../utility/API/endpoints';
import { Validation } from '../../utility/validation/validation';
import { ErrorMessage } from '@hookform/error-message';

export type CheckVisitFormValues = {
  reservation_code: string;
};

const CheckVisitForm = (): JSX.Element => {
  const [errorMessageFromServer, setErrorMessageFromServer] = useState<any>();
  const methods = useForm<CheckVisitFormValues>({ mode: 'all' });
  const [visitTime, setVisitTime] = useState<string>();

  const onSubmit = async (data: CheckVisitFormValues) => {
    setVisitTime('');
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.BOOKING.CHECK_VISIT}/${data.reservation_code}`
      );
      setVisitTime(response.data);
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

  return (
    <>
      <FormProvider {...methods}>
        <form
          className='mx-auto flex w-4/5 flex-col gap-1'
          onSubmit={methods.handleSubmit(onSubmit, onError)}
        >
          <Label name='Reservation Code' />
          <Input
            label='reservation_code'
            validation={Validation.reservation_code}
          />
          <ErrorMessage
            errors={methods.formState.errors}
            name='reservation_code'
            render={({ message }) => <p className='text-red-600'>{message}</p>}
          />

          <input
            type='submit'
            value='Check visit'
            className={`mt-4 py-2 rounded-lg ${
              methods.formState.isValid
                ? 'cursor-pointer bg-lime-500 text-black hover:bg-lime-600 hover:text-white duration-300'
                : 'cursor-not-allowed bg-rose-300 text-white'
            }`}
            disabled={!methods.formState.isValid}
          />
        </form>
      </FormProvider>

      {errorMessageFromServer?.message && (
        <p className='py-8 text-center text-lg text-red-600 font-medium'>
          {errorMessageFromServer.message}
        </p>
      )}

      {visitTime && (
        <p className='py-8 text-center text-lg font-semibold'>{visitTime}</p>
      )}
    </>
  );
};

export default CheckVisitForm;
