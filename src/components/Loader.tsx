import { FC } from 'react';

const Loader: FC = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='animate-loader border-t-accent-foreground ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12'></div>
    </div>
  );
};

export default Loader;
