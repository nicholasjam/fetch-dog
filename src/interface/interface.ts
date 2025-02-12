
export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface DogState {
  dogs: Dog[];
  breeds: string[];
  zipCodes: string[];
  locations: Record<string, string>;
  selectedZipCode: string;
  totalPages: number;
  totalResults: number;
  page: number;
  pageSize: number;
  loading: boolean;
  selectedBreed: string;
  sortOrder: "asc" | "desc";
  favoriteDogs: string[];
  matchedDog: Dog | null;
  matchedDogLoading: boolean;
  ageMin: number | null;
  ageMax: number | null;

  setSelectedBreed: (breed: string) => void;
  setSelectedZipCode: (zip: string) => void;
  setPage: (page: number) => void;
  setAgeRange: (ageMin: number | null, ageMax: number | null) => void;
  toggleSortOrder: () => void;
  toggleFavorite: (id: string) => void;
  fetchDogs: () => Promise<void>;
  fetchBreeds: () => Promise<void>;
  fetchLocations: () => Promise<void>;
  generateMatch: () => Promise<void>;
}

export interface Location {
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
}

export interface DogSearchResponse {
  resultIds: string[];
  total: number;
}

export interface LocationResponse {
  results: Location[];
  total: number;
}

export interface DogSearchFilters {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: number;
  sort?: string;
}

export interface LoaderProps {
  size?: number;
  borderWidth?: number;
  color?: string;
}