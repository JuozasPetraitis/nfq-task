import { FieldErrors, FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Input, Label } from './FormFields';
import { Validation } from '../../utility/validation/validation';
import { ErrorMessage } from '@hookform/error-message';
import useAuth from '../../hooks/Auth/useAuth';
import { RegisterFormValues } from '../../interfaces/auth.interface';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authState } from '../../store/slice/auth.slice';

const RegisterForm = () => {
  const [errorMessageFromServer, setErrorMessageFromServer] = useState<any>();
  const navigate = useNavigate();
  const methods = useForm<RegisterFormValues>({
    mode: 'all',
  });
  const { registerHandler } = useAuth();

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const isRegisterSuccess = await registerHandler(data);

      if (isRegisterSuccess) {
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
    console.error(errors);
    methods.reset();
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          className='mx-auto flex w-4/5 flex-col gap-2'
          onSubmit={methods.handleSubmit(onSubmit, onError)}
        >
          <Label name='Full name' />
          <Input label='fullName' validation={Validation.full_name} />
          <ErrorMessage
            errors={methods.formState.errors}
            name='fullName'
            render={({ message }) => <p className='text-red-600'>{message}</p>}
          />

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

          <Label name='Service' />
          <select
            {...methods.register('service', { required: true })}
            className='rounded-lg border border-gray-400 bg-gray-50 placeholder:text-gray-400 px-4 py-4'
          >
            <option value='post_office'>Post office</option>
            <option value='bank'>Bank</option>
            <option value='hospital'>Hospital</option>
          </select>
          <ErrorMessage
            errors={methods.formState.errors}
            name='service'
            render={({ message }) => <p className='text-red-600'>{message}</p>}
          />

          <input
            type='submit'
            value='Register'
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
        <p className='py-8 text-center text-lg text-red-600'>
          {errorMessageFromServer.message}
        </p>
      )}
    </>
  );
};

export default RegisterForm;
