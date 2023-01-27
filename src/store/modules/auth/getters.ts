import { RootState } from '@/store/types';
import { GetterTree } from 'vuex';
import { AuthState } from './types';

export const getters: GetterTree<AuthState, RootState> = {
  userId(state): string | null {
    return state.userId;
  },

  token(state): string | null {
    return state.token;
  },

  isAuthenticated(state): boolean {
    return !!state.token;
  },
};
