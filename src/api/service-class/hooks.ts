import { useQuery } from '@tanstack/react-query';
import { ServiceClass } from '@/api/service-class/api.ts';
export const KEY_SERVICE_CLASS = 'service-class';

export const useServiceClassQuery = () => {
  return useQuery({
    queryKey: [KEY_SERVICE_CLASS],
    queryFn: ServiceClass.getAllServiceClass,
  });
};
