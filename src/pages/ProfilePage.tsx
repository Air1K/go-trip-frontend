import { FC } from 'react';
import Card from '@/components/ui-custom/Card.tsx';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { useQueryClient } from '@tanstack/react-query';
import { IUser } from '@/api/user/types.ts';
import { KEY_PROFILE } from '@/api/user/hooks.ts';
import baseAvatar from '@/assets/img/default-avatar-icon.webp';
import ItemProfileInfo from '@/components/ItemProfileInfo.tsx';
import { formatDate } from 'date-fns';

const ProfilePage: FC = () => {
  const queryClient = useQueryClient();
  const userProfile = queryClient.getQueryData<IUser>([KEY_PROFILE]);
  return (
    <div className={'grid grid-flow-col gap-3 items-start'}>
      <Card className={'flex flex-col gap-3 justify-center'}>
        <Avatar className='h-24 w-24 border-4 border-white m-auto'>
          <AvatarImage src={userProfile?.avatar || baseAvatar} />
          <AvatarFallback>
            <Skeleton className='w-6 h-6 rounded-full' />
          </AvatarFallback>
        </Avatar>
        <h4 className='font-medium text-xl leading-[22px] whitespace-nowrap tracking-tight text-center'>
          {userProfile?.firstName + ' ' + userProfile?.lastName}
        </h4>
        <p className={'text-center'}>{userProfile?.email}</p>
      </Card>
      <Card className={''}>
        <ItemProfileInfo name='Имя' value={userProfile?.firstName} />
        <ItemProfileInfo name='Фамилия' value={userProfile?.lastName} />
        <ItemProfileInfo name='Отчество' value={userProfile?.patronymic} />
        <ItemProfileInfo name='Email' value={userProfile?.email} />
        <ItemProfileInfo name='Роль' value={userProfile?.role} />
      </Card>
      <Card className={''}>
        <ItemProfileInfo name='Дата рождения' value={formatDate(userProfile?.dateOfBirth || '', 'yyyy-MM-dd')} />
        <ItemProfileInfo name='Серия паспорта' value={userProfile?.passportSeries} />
        <ItemProfileInfo name='Номер паспорта' value={userProfile?.passportNumber} />
        <ItemProfileInfo name='Кем выдан' value={userProfile?.passportIssuedBy} />
        <ItemProfileInfo name='Дата выдачи' value={formatDate(userProfile?.passportIssueDate || '', 'yyyy-MM-dd')} />
      </Card>
    </div>
  );
};

export default ProfilePage;
