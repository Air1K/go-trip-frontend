import $api from '@/api/base/httpClient.ts';
import { IUser } from '@/api/user/types.ts';

export const authApi = {
  checkAuth: async (): Promise<IUser> => {
    const { data } = await $api.get('refresh');
    return data.user;
  },
  login: async (body: { email: string; password: string }): Promise<IUser> => {
    const { data } = await $api.post('login', body);
    return data.user;
  },
  logout: async (): Promise<void> => {
    await $api.post('logout');
  },
};
