import { IServiceClass } from '@/api/service-class/types.ts';
import { ISettlement } from '@/api/settlement/types.ts';

export interface IHotel {
  id: number;
  name: string;
  service_classes_id: number;
  settlements_id: number;
  serviceClasses: IServiceClass;
  settlements: ISettlement;
}
