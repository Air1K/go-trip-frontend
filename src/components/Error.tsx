import { FC, HTMLAttributes } from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.tsx';
import { cn } from '@/lib/utils.ts';

const Error: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div {...props} className={cn('w-full h-full', props.className)}>
      <Alert className={'mt-4'} variant='destructive'>
        <AlertCircle className='h-4 w-4' />
        <AlertTitle>Ошибка</AlertTitle>
        <AlertDescription>Произошла непредвиденная ошибка</AlertDescription>
      </Alert>
    </div>
  );
};

export default Error;
