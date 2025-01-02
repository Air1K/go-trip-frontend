import { IUser } from '@/api/user/types.ts';

export const mapServerUserToUser = (serverUser: never): IUser => ({
  firstName: serverUser['first_name'],
  lastName: serverUser['last_name'],
  email: serverUser['email'],
  role: serverUser['role'],
  avatar: serverUser['avatar'] || '',
});
