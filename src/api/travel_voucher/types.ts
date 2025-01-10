import { IUser } from '@/api/user/types.ts';
import { IHotel } from '@/api/hotel/types.ts';
import { ITravelAgency } from '@/api/travel-agency/types.ts';
import { IUnitOfMeasurement } from '@/api/units-of-measurement/types.ts';

export interface ITravelVoucher {
  id: number;
  issued_at: string;
  departure_date: string;
  arrival_date: string;
  price: number;
  tourist_id: string | null;
  tourist?: IUser;
  hotel_id: number;
  hotel?: IHotel;
  travel_agency_id: number;
  travelAgency?: ITravelAgency;
  unit_id: number;
  unitOfMeasurement?: IUnitOfMeasurement;
}
