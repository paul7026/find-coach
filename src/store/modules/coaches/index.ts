import { CoachesState } from './types';
import { getters } from './getters';
import { mutations } from './mutations';
import { actions } from './actions';
import { Module } from 'vuex';
import { RootState } from '@/store/types';

const state: CoachesState = {
  lastFetch: null,
  coaches: [],
};

export const coaches: Module<CoachesState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
