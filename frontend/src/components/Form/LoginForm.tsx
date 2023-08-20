import { ErrorMessage } from '@hookform/error-message';
import { useState } from 'react';
import { useForm, FormProvider, FieldErrors } from 'react-hook-form';
import useAuth from '../../hooks/Auth/useAuth';
import { Input, Label } from './FormFields';
import { Validation } from '../../utility/validation/validation';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { LogInFormValues } from '../../interfaces/auth.interface';

const LoginForm = (): JSX.Element => {
  const [errorMessageFromServer, setErrorMessageFromServer] =
    useState<AxiosError>();
  const navigate = useNavigate();
  const methods = useForm<LogInFormValues>({ mode: 'all' });
  const { logInHandler } = useAuth();

  const onSubmit = async (logInFormValues: LogInFormValues) => {
    try {
      const isLoginSuccess = await logInHandler(logInFormValues);

      if (isLoginSuccess) {
        navigate('/profile');
        return;
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      setErrorMessageFromServer(axiosError);
      setTimeout(() => {
        setErrorMessageFromServer(errorMessageFromServer);
        methods.reset();
      }, 3000);
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
          className='mx-auto flex w-4/5 flex-col gap-2'
          onSubmit={methods.handleSubmit(onSubmit, onError)}
        >
          <Label name='Email' />
          <Input type='email' label='email' validation={Validation.email} />
          <ErrorMessage
            errors={methods.formState.errors}
            name='email'
            render={({ message }) => <p className='text-red-600'>{message}</p>}
          />

          <Label name='Password' />
          <Input
            label='password'
            type='password'
            validation={Validation.password}
          />
          <ErrorMessage
            errors={methods.formState.errors}
            name='password'
            render={({ message }) => <p className='text-red-600'>{message}</p>}
          />

          <input
            type='submit'
            value='Log In'
            className={`mt-4 py-2 rounded-lg ${
              methods.formState.isValid
                ? 'input-submit cursor-pointer bg-lime-500 text-black hover:bg-lime-600 hover:text-white duration-300'
                : 'input-submit cursor-not-allowed bg-rose-300 text-white'
            }`}
            disabled={!methods.formState.isValid}
          />
        </form>
      </FormProvider>

      {errorMessageFromServer?.message && (
        <p className='py-8 text-center text-lg text-red-600'>
          {errorMessageFromServer.message}
        </p>
      )}
    </>
  );
};

export default LoginForm;
