import { useFormContext } from 'react-hook-form';

type InputProps = {
  label: string;
  type?: 'text' | 'email' | 'password';
  validation?: any;
};

const Input = ({ label, validation, type }: InputProps): JSX.Element => {
  const { register } = useFormContext();

  return (
    <input
      type={type ? type : 'text'}
      className='rounded-lg border border-gray-400 px-5 py-3 text-lg'
      {...register(label, validation)}
    />
  );
};

export default Input;
