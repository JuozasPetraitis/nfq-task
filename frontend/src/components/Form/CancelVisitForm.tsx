import { useState } from 'react';
import { useForm, FormProvider, FieldErrors } from 'react-hook-form';
import { Input, Label } from './FormFields';
import axios from 'axios';
import { API_ENDPOINTS } from '../../utility/API/endpoints';
import { Validation } from '../../utility/validation/validation';
import { ErrorMessage } from '@hookform/error-message';

export type CancelVisitFormValues = {
  reservation_code: string;
};

const CancelVisitForm = (): JSX.Element => {
  const [errorMessageFromServer, setErrorMessageFromServer] =
    useState<string>();
  const methods = useForm<CancelVisitFormValues>({ mode: 'all' });
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const onSubmit = async (cancelVisitFormValues: CancelVisitFormValues) => {
    const { reservation_code } = cancelVisitFormValues;
    try {
      const response = await axios.delete(
        `${API_ENDPOINTS.BOOKING.CANCEL_VISIT}/${reservation_code}`
      );
      const { status } = response;
      if (status === 200) {
        setIsSuccess(true);
        return;
      }
      setIsSuccess(false);
    } catch (error) {
      setErrorMessageFromServer('An error occurred in the server');
      setIsSuccess(false);
    }
  };

  const onError = (errors: FieldErrors) => {
    methods.reset();
    console.error(errors);
  };

  return (
    <>
      <p className='cursor-default text-center text-4xl font-thin tracking-tight'>
        Cancel visit form
      </p>

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
            value='Cancel visit'
            className={`mt-4 py-2 rounded-lg ${
              methods.formState.isValid
                ? 'cursor-pointer bg-lime-500 text-black hover:bg-lime-600 hover:text-white duration-300'
                : 'cursor-not-allowed bg-rose-300 text-white'
            }`}
            disabled={!methods.formState.isValid}
          />
        </form>
      </FormProvider>

      {errorMessageFromServer && (
        <p className='py-8 text-center text-lg text-red-600'>
          {errorMessageFromServer}
        </p>
      )}

      {isSuccess && (
        <p className='py-8 text-center text-lg text-green-600'>
          Visit was successfully cancelled
        </p>
      )}
    </>
  );
};

export default CancelVisitForm;
