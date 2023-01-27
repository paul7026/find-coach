export interface AuthState {
  userId: string | null;
  token: string | null;
  tokenExpiration: string | null;
}
