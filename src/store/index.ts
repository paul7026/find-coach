import { createStore } from 'vuex';
import { coaches } from '@/store/modules/coaches';
import { requests } from '@/store/modules/requests';
import { RootState } from './types';

export default createStore<RootState>({
  state() {
    return {
      userId: 'c3',
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
});
