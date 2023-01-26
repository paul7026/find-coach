import { Coach } from '@/models/CoachesModel';

export interface CoachesState {
  lastFetch: null | number;
  coaches: Coach[];
}
