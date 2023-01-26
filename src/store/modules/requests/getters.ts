import { Request } from '@/models/RequestsModel';
import { RootState } from '@/store/types';
import { GetterTree } from 'vuex';
import { RequestState } from './types';

export const getters: GetterTree<RequestState, RootState> = {
  requests(state, _, _2, rootGetters): Request[] {
    const coachId = rootGetters.userId;
    return state.requests.filter((req) => req.coachId === coachId);
  },

  hasRequests(_, getters): boolean {
    return getters.requests && getters.requests.length > 0;
  },
};
