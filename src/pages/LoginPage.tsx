import { FC, useState } from 'react';
import Controller from '@/components/ui-custom/Controller.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
interface IUserLoginForm {
  userName: ItemState;
  password: ItemState;
}
interface ItemState {
  value: string;
  errorMessage: string;
}
const LoginPage: FC = () => {
  const [userForm, setUserForm] = useState<IUserLoginForm>({
    userName: { value: '', errorMessage: '' },
    password: { value: '', errorMessage: '' },
  });
  const submitForm = () => {
    if (!userForm.userName.value) {
      setUserForm({ ...userForm, userName: { ...userForm.userName, errorMessage: 'Поле не может быть пустым' } });
    }
    if (!userForm.password.value) {
      setUserForm({ ...userForm, password: { ...userForm.password, errorMessage: 'Поле не может быть пустым' } });
    }
    if (userForm.userName.value.length < 3) {
      setUserForm({ ...userForm, userName: { ...userForm.userName, errorMessage: 'Минимальное ко-во символов 3' } });
    }
    if (userForm.password.value.length < 8) {
      setUserForm({ ...userForm, password: { ...userForm.password, errorMessage: 'Минимальное ко-во символов 8' } });
    }
  };

  return (
    <div className={'flex w-full h-screen'}>
      <div className={'max-w-[400px] w-full m-auto'}>
        <h3 className={'mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0'}>
          Авторизация
        </h3>
        <Controller className={'mb-4'} label={'Введите имя пользователя'} errorMessage={userForm.userName.errorMessage}>
          <Input
            value={userForm.userName.value}
            onChange={(e) => setUserForm({ ...userForm, userName: { value: e.target.value, errorMessage: '' } })}
            type='text'
            placeholder='Username'
          />
        </Controller>
        <Controller label={'Укажите пароль'} errorMessage={userForm.password.errorMessage}>
          <Input
            value={userForm.password.value}
            onChange={(e) => setUserForm({ ...userForm, password: { value: e.target.value, errorMessage: '' } })}
            type='password'
            placeholder='Password'
          />
        </Controller>
        <Button className={'mt-8'} onClick={submitForm}>
          Авторизоваться
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
