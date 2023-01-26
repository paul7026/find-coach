import { RootState } from '@/store/types';
import { Module } from 'vuex';
import { RequestState } from './types';
import { mutations } from './mutations';
import { actions } from './actions';
import { getters } from './getters';

const state: RequestState = {
  requests: [],
};

export const requests: Module<RequestState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
