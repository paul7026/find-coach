import { createStore, createLogger } from 'vuex';
import { coaches } from '@/store/modules/coaches';
import { requests } from '@/store/modules/requests';
import { auth } from '@/store/modules/auth';
import { RootState } from './types';
import createPersistedState from 'vuex-persistedstate';

export default createStore<RootState>({
  modules: {
    coaches,
    requests,
    auth,
  },

  plugins:
    process.env.NODE_ENV === 'development'
      ? [createLogger(), createPersistedState()]
      : [createPersistedState()],
});
