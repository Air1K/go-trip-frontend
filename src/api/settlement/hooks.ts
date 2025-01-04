import { useQuery } from '@tanstack/react-query';
import { Settlement } from '@/api/settlement/api.ts';
export const KEY_SETTLEMENT = 'settlement';

export const useSettlementQuery = () => {
  return useQuery({
    queryKey: [KEY_SETTLEMENT],
    queryFn: Settlement.getAllSettlement,
  });
};
