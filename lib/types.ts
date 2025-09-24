export type ClubRecord = {
  id: string | number;
  name: string;
  city: string;
  photoUrl?: string;
  description?: string;
  instagram?: string;
};

export type WorkoutRecord = {
  id: string | number;
  title?: string;
  date?: string;
  city?: string;
  distanceKm?: number;
  paceMin?: number;
  paceMax?: number;
  location?: string;
  isOpen?: boolean;
  clubName?: string;
};

export type RaceRecord = {
  id: string | number;
  title: string;
  city?: string;
  date?: string;
  distanceKm?: number;
  url?: string;
};

export type RouteRecord = {
  id: string | number;
  title: string;
  city?: string;
  distanceKm?: number;
  surface?: string;
  description?: string;
};
