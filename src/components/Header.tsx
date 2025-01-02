import { FC, useEffect } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { getNavLinks, userLink } from '@/config/navigation.tsx';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import AvatarController from '@/components/ui-custom/AvatarController.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLogoutMutation } from '@/api/user/hooks.ts';
interface HeaderProps {
  user: {
    role: string;
    userName: string;
    avatar: string;
  };
}

const Header: FC<HeaderProps> = ({ user }) => {
  const location = useLocation();
  const { mutate: logout, isSuccess } = useLogoutMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      navigate('/login');
    }
  }, [isSuccess]);
  return (
    <header className={'container mx-auto flex justify-between items-center gap-4 py-2'}>
      <div className={'prose'}>
        <h2>Я турист</h2>
      </div>
      <nav className={'ml-auto flex gap-2'}>
        {getNavLinks(user.role).map((link, index) => (
          <Button variant={location.pathname === link.path ? 'outline' : 'ghost'} size={'sm'} key={index} asChild>
            <NavLink to={link.path}>{link.label}</NavLink>
          </Button>
        ))}
      </nav>
      <div>
        {!!user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size={'sm'}>
                {user.avatar && <AvatarController avatarUrl={user.avatar} />} {user.userName}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <NavLink to={userLink.profile}>Профиль</NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem>Настройки</DropdownMenuItem>
              <DropdownMenuItem onClick={() => logout()}>Выход</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};

export default Header;
