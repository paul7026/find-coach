import { CoachesState } from './modules/coaches/types';
import { RequestState } from './modules/requests/types';
import { AuthState } from './modules/auth/types';

export interface RootState {
  coaches: CoachesState;
  requests: RequestState;
  auth: AuthState;
}
