import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/api/user/api.ts';
export const KEY_PROFILE = 'profile';

export const useCheckAuthQuery = () => {
  return useQuery({
    queryKey: [KEY_PROFILE],
    queryFn: authApi.checkAuth,
    retry: false,
    staleTime: Infinity,
  });
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authApi.login,
    mutationKey: [KEY_PROFILE],
    onSuccess: (data) => {
      queryClient.setQueryData([KEY_PROFILE], data);
    },
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: async () => {
      queryClient.removeQueries({ queryKey: [KEY_PROFILE] });
    },
  });
};
