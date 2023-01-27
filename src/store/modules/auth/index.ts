import { RootState } from '@/store/types';
import { Module } from 'vuex';
import { AuthState } from './types';
import { mutations } from './mutations';
import { getters } from './getters';
import { actions } from './actions';

const state: AuthState = {
  userId: null,
  token: null,
  tokenExpiration: null,
};

export const auth: Module<AuthState, RootState> = {
  state,
  mutations,
  actions,
  getters,
};
