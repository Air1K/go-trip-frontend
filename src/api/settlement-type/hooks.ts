import { useQuery } from '@tanstack/react-query';
import { SettlementType } from '@/api/settlement-type/api.ts';
export const KEY_SETTLEMENT_TYPE = 'settlement-type';

export const useSettlementTypeQuery = () => {
  return useQuery({
    queryKey: [KEY_SETTLEMENT_TYPE],
    queryFn: SettlementType.getAllSettlementType,
  });
};
