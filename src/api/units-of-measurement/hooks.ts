import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UnitOfMeasurement } from '@/api/units-of-measurement/api.ts';
export const KEY_UNIT_OF_MEASUREMENT = 'unit-of-measurement';

export const useUnitOfMeasurementQuery = () => {
  return useQuery({
    queryKey: [KEY_UNIT_OF_MEASUREMENT],
    queryFn: UnitOfMeasurement.getAllUnitOfMeasurement,
  });
};

export const useUnitOfMeasurementAddMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UnitOfMeasurement.addUnitOfMeasurement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY_UNIT_OF_MEASUREMENT] });
    },
  });
};

export const useUnitOfMeasurementUpdateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<Parameters<typeof UnitOfMeasurement.updateUnitOfMeasurement>[1]>;
    }) => UnitOfMeasurement.updateUnitOfMeasurement(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY_UNIT_OF_MEASUREMENT] });
    },
  });
};
