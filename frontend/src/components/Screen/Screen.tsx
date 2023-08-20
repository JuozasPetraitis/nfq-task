import { FieldErrors, FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Validation } from '../../utility/validation/validation';
import { ErrorMessage } from '@hookform/error-message';
import { RegisterFormValues } from '../../interfaces/auth.interface';
import { Input, Label } from '../Form/FormFields';
import ServiceScreen from './DepartmentScreen';

const Screen = () => {
  const [errorMessageFromServer, setErrorMessageFromServer] =
    useState<string>();
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const methods = useForm<RegisterFormValues>({
    mode: 'all',
  });

  const onSubmit = (RegisterFormValues: { password: string }) => {
    if (
      RegisterFormValues.password === process.env.REACT_APP_SCREEN_SECRET_KEY
    ) {
      setIsCorrect(true);
      return;
    }
    setErrorMessageFromServer('Wrong password');
    return setIsCorrect(false);
  };

  const onError = (errors: FieldErrors) => {
    console.error(errors);
    methods.reset();
  };

  return (
    <>
      {!isCorrect && (
        <>
          <FormProvider {...methods}>
            <form
              className='mx-auto flex w-4/5 flex-col gap-2'
              onSubmit={methods.handleSubmit(onSubmit, onError)}
            >
              <Label name='Password' />
              <Input
                label='password'
                type='text'
                validation={Validation.secret_screen_key}
              />
              <ErrorMessage
                errors={methods.formState.errors}
                name='password'
                render={({ message }) => (
                  <p className='text-red-600'>{message}</p>
                )}
              />

              <input
                type='submit'
                value='Submit'
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
        </>
      )}

      {isCorrect && <ServiceScreen />}
    </>
  );
};

export default Screen;
