import { SIGNUP_NEW_USER_ENDPOINT, SIGN_IN_USER_ENDPOINT } from '@/config';
import { RootState } from '@/store/types';
import { ActionTree } from 'vuex';
import { AuthState } from './types';

export const actions: ActionTree<AuthState, RootState> = {
  async login(context, payload) {
    const response = await fetch(SIGN_IN_USER_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error.message || 'Failed to authenticate');
    }

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    });
  },

  async signup(context, payload) {
    const response = await fetch(SIGNUP_NEW_USER_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error.message || 'Failed to authenticate');
    }

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    });
  },

  logout(context) {
    context.commit('setUser', {
      token: null,
      userId: null,
      tokenExpiration: null,
    });
  },
};
