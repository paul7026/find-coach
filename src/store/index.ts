import { createStore, createLogger } from 'vuex';
import { coaches } from '@/store/modules/coaches';
import { requests } from '@/store/modules/requests';
import { RootState } from './types';
import createPersistedState from 'vuex-persistedstate';

export default createStore<RootState>({
  state() {
    return {
      userId: 'c5',
    };
  },

  getters: {
    userId(state): string {
      return state.userId;
    },
  },

  modules: {
    coaches,
    requests,
  },

  plugins:
    process.env.NODE_ENV === 'development'
      ? [createLogger(), createPersistedState()]
      : [createPersistedState()],
});
