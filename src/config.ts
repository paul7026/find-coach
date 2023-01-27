export const BASE_URL = 'https://find-coach-894a4-default-rtdb.firebaseio.com';

export const ALL_COACHES = BASE_URL + '/coaches.json';

export const fetchCoachByUserId = (userId: string, token: string): string =>
  `${BASE_URL}/coaches/${userId}.json?auth=${token}`;

export const contactCoach = (coachId: string): string =>
  `${BASE_URL}/requests/${coachId}.json`;

export const fetchRequestsByCoachId = (
  coachId: string,
  token: string
): string => `${BASE_URL}/requests/${coachId}.json?auth=${token}`;

export const WEB_API_KEY = 'AIzaSyBLzgvYnkFIWI2oy7L1iVPjBSDvcRywx8M';

export const SIGNUP_NEW_USER_ENDPOINT =
  'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
  WEB_API_KEY;

export const SIGN_IN_USER_ENDPOINT =
  'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
  WEB_API_KEY;
