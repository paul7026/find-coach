import { activeFilters, Coach } from '@/models/CoachesModel';
import { RootState } from '@/store/types';
import { GetterTree } from 'vuex';
import { CoachesState } from './types';

export const getters: GetterTree<CoachesState, RootState> = {
  coaches(state): Coach[] {
    return state.coaches;
  },

  hasCoaches(state): boolean {
    return state.coaches && state.coaches.length > 0;
  },

  filteredCoaches: (state) => (activeFilters: activeFilters) => {
    return state.coaches.filter((coach: Coach) => {
      if (activeFilters.frontend && coach.areas.includes('frontend'))
        return true;
      if (activeFilters.backend && coach.areas.includes('backend')) return true;
      if (activeFilters.career && coach.areas.includes('career')) return true;
      return false;
    });
  },

  isCoach(state, getters, rootState, rootGetters): boolean {
    const coaches = state.coaches;
    const userId = rootGetters.userId;
    return coaches.some((coach) => coach.id === userId);
  },

  shouldUpdate(state): boolean {
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true;
    } else {
      const currentTimeStamp = new Date().getTime();
      // update every 1 min
      return (currentTimeStamp - lastFetch) / 1000 > 60;
    }
  },
};
