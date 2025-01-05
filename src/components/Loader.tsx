import { FC, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils.ts';

const Loader: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div {...props} className={cn('flex justify-center items-center h-screen', props.className)}>
      <div className='animate-loader border-t-accent-foreground ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12'></div>
    </div>
  );
};

export default Loader;
