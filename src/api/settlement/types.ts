import { ISettlementType } from '@/api/settlement-type/types.ts';
import { ICountry } from '@/api/country/types.ts';

export interface ISettlement {
  id: number;
  name: string;
  settlement_type_id: number;
  country_code: string;
  settlementType: ISettlementType;
  country: ICountry;
}
