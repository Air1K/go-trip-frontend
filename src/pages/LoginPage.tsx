import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import Controller from '@/components/ui-custom/Controller.tsx';
import { useLoginMutation } from '@/api/user/hooks.ts';
import { Navigate } from 'react-router-dom';

// Определяем схему валидации
const loginSchema = z.object({
  email: z.string().email('Введите корректный email'),
  password: z
    .string()
    .min(4, 'Пароль должен содержать минимум 4 символов')
    .max(32, 'Пароль не должен превышать 32 символа'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
  const { mutate: login, isSuccess, isPending, error } = useLoginMutation();

  const submitForm = (data: LoginFormValues) => {
    console.log('Форма отправлена с данными:', data);
    login(data);
  };

  if (isSuccess) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className={'flex w-full h-screen'}>
      <div className={'max-w-[400px] w-full m-auto'}>
        <h3 className={'mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0'}>
          Авторизация
        </h3>
        <form onSubmit={handleSubmit(submitForm)}>
          <Controller className={'mb-4'} label={'Введите имя пользователя'} errorMessage={errors.email?.message || ''}>
            <Input type='email' placeholder='Email' {...register('email')} className={'border'} />
          </Controller>
          <Controller label={'Укажите пароль'} errorMessage={errors.password?.message || ''}>
            <Input type='password' placeholder='Пароль' {...register('password')} className={'border'} />
          </Controller>

          <Button type='submit' className={'mt-8 w-full'}>
            Авторизоваться
          </Button>
        </form>
      </div>
      {isSuccess && <div>Вы успешно авторизовались</div>}
      {error && <div>Произошла ошибка при авторизации</div>}
      {isPending && <div>Авторизация...</div>}
    </div>
  );
};

export default LoginPage;
