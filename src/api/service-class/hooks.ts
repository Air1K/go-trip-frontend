import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ServiceClass } from '@/api/service-class/api.ts';
export const KEY_SERVICE_CLASS = 'service-class';

export const useServiceClassQuery = () => {
  return useQuery({
    queryKey: [KEY_SERVICE_CLASS],
    queryFn: ServiceClass.getAllServiceClass,
  });
};

export const useServiceClassAddMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ServiceClass.addServiceClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY_SERVICE_CLASS] });
    },
  });
};

export const useServiceClassUpdateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Parameters<typeof ServiceClass.updateServiceClass>[1]> }) =>
      ServiceClass.updateServiceClass(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY_SERVICE_CLASS] });
    },
  });
};
