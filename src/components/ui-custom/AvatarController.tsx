import { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';

interface AvatarControllerProps {
  avatarUrl: string;
}

const AvatarController: FC<AvatarControllerProps> = ({ avatarUrl }) => {
  return (
    <Avatar className='h-6 w-6'>
      <AvatarImage src={avatarUrl} />
      <AvatarFallback>
        <Skeleton className='w-6 h-6 rounded-full' />
      </AvatarFallback>
    </Avatar>
  );
};

export default AvatarController;
