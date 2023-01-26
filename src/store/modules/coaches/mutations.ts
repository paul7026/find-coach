import { Coach } from '@/models/CoachesModel';
import { MutationTree } from 'vuex';
import { CoachesState } from './types';

export const mutations: MutationTree<CoachesState> = {
  registerCoach(state, payload: Coach) {
    state.coaches.push(payload);
  },

  setCoaches(state, payload: Coach[]) {
    state.coaches = payload;
  },

  setFetchTimeStamp(state) {
    state.lastFetch = new Date().getTime();
  },
};
