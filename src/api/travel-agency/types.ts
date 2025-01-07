import { ITourOperator } from '@/api/tour-operator/types.ts';

export interface ITravelAgency {
  id: number;
  name: string;
  short_name?: string;
  tour_operator_id: number;
  tourOperator: ITourOperator;
}
