export const BASE_URL = 'https://find-coach-894a4-default-rtdb.firebaseio.com';

export const ALL_COACHES = BASE_URL + '/coaches.json';

export const fetchCoachByUserId = (userId: string): string =>
  `${BASE_URL}/coaches/${userId}.json`;

export const fetchRequestsByCoachId = (coachId: string): string =>
  `${BASE_URL}/requests/${coachId}.json`;
