import { useQuery } from '@tanstack/react-query';
import { UnitOfMeasurement } from '@/api/units-of-measurement/api.ts';
export const KEY_UNIT_OF_MEASUREMENT = 'unit-of-measurement';

export const useUnitOfMeasurementQuery = () => {
  return useQuery({
    queryKey: [KEY_UNIT_OF_MEASUREMENT],
    queryFn: UnitOfMeasurement.getAllUnitOfMeasurement,
  });
};
