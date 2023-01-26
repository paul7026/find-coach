import { Request } from '@/models/RequestsModel';
import { MutationTree } from 'vuex';
import { RequestState } from './types';

export const mutations: MutationTree<RequestState> = {
  addRequest(state, payload: Request) {
    state.requests.push(payload);
  },

  setRequests(state, payload) {
    state.requests = payload;
  },
};
