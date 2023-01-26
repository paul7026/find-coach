export interface Coach {
  id: string;
  firstName: string;
  lastName: string;
  areas: string[];
  description: string;
  hourlyRate: number;
}

export interface CoachFormData {
  firstName: string | null;
  lastName: string | null;
  description: string | null;
  hourlyRate: number | null;
  areas: string[] | null;
}

export interface activeFilters {
  frontend: boolean;
  backend: boolean;
  career: boolean;
}
