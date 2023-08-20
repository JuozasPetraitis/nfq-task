type Props = {
  name: string;
};

const Label = ({ name }: Props) => {
  return (
    <label htmlFor={name} className='font-extralight tracking-wider text-xl'>
      {name}
    </label>
  );
};

export default Label;
