export interface Coach {
  id: string;
  firstName: string;
  lastName: string;
  areas: string[];
  description: string;
  hourlyRate: number;
}

export interface CoachFormData {
  firstName: string;
  lastName: string;
  description: string;
  hourlyRate: number;
  areas: string[];
}

export interface activeFilters {
  frontend: boolean;
  backend: boolean;
  career: boolean;
}
