import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SettlementType } from '@/api/settlement-type/api.ts';
export const KEY_SETTLEMENT_TYPE = 'settlement-type';

export const useSettlementTypeQuery = () => {
  return useQuery({
    queryKey: [KEY_SETTLEMENT_TYPE],
    queryFn: SettlementType.getAllSettlementType,
  });
};

export const useSettlementTypeAddMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: SettlementType.addSettlementType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY_SETTLEMENT_TYPE] });
    },
  });
};

export const useSettlementTypeUpdateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Parameters<typeof SettlementType.updateSettlementType>[1]> }) =>
      SettlementType.updateSettlementType(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY_SETTLEMENT_TYPE] });
    },
  });
};
