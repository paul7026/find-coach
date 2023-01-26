import { RootState } from '@/store/types';
import { ActionTree } from 'vuex';
import { RequestState } from './types';
import { Request, RequestFormData } from '@/models/RequestsModel';

export const actions: ActionTree<RequestState, RootState> = {
  async contactCoach(context, payload: RequestFormData) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };

    const response = await fetch(
      `https://find-coach-894a4-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to send requests.');
    }

    context.commit('addRequest', {
      ...newRequest,
      id: responseData.name,
      coachId: payload.coachId,
    });
  },

  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const response = await fetch(
      `https://find-coach-894a4-default-rtdb.firebaseio.com/requests/${coachId}.json`
    );
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || 'Failed to fetch requests.');
    }

    const requests: Request[] = [];

    for (const key in responseData) {
      const request: Request = {
        id: key,
        coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message,
      };
      requests.push(request);
    }

    context.commit('setRequests', requests);
  },
};
