import { FC } from 'react';
import Header from '@/components/Header.tsx';
import { Navigate, Outlet } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { IUser } from '@/api/user/types.ts';
import { KEY_PROFILE } from '@/api/user/hooks.ts';

const MainLayout: FC = () => {
  const queryClient = useQueryClient();
  const userProfile = queryClient.getQueryData<IUser>([KEY_PROFILE]);
  console.log(userProfile);
  if (!userProfile) {
    return <Navigate to={'/login'} />;
  }
  return (
    <div>
      <Header
        user={{
          role: userProfile.role,
          userName: userProfile?.firstName + ' ' + userProfile?.lastName || '',
          avatar: userProfile?.avatar || '',
        }}
      />
      <main className={'container mx-auto'}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
