import { ALL_COACHES, fetchCoachByUserId } from '@/config';
import { Coach, CoachFormData } from '@/models/CoachesModel';
import { RootState } from '@/store/types';
import { ActionTree } from 'vuex';
import { CoachesState } from './types';

export const actions: ActionTree<CoachesState, RootState> = {
  async registerCoach(context, payload: CoachFormData) {
    const userId: string = context.rootGetters.userId;
    const response = await fetch(fetchCoachByUserId(userId), {
      method: 'PUT',
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to fetch!');
    }

    context.commit('registerCoach', { ...payload, id: userId });
  },

  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    const response = await fetch(ALL_COACHES);

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to fetch!');
    }

    const coaches: Coach[] = [];

    for (const key in responseData) {
      const coach: Coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
      };
      coaches.push(coach);
    }

    context.commit('setCoaches', coaches);
    context.commit('setFetchTimeStamp');
  },
};
