export interface Request {
  id: string;
  coachId: string;
  userEmail: string;
  message: string;
}

export interface RequestFormData {
  email: string;
  message: string;
  coachId: string;
}
