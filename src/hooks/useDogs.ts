import { DogSearchFilters } from "@/interface/interface";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const searchDogs = async (filters: DogSearchFilters) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, String(v)));
      } else {
        params.append(key, String(value));
      }
    }
  });

  return axios.get(`${API_BASE}/dogs/search?${params.toString()}`, { withCredentials: true });
};


export const getDogDetails = async (ids: string[]) => {
  return axios.post(`${API_BASE}/dogs`, ids, { withCredentials: true });
};

export const getDogMatch = async (ids: string[]) => {
  return axios.post(`${API_BASE}/dogs/match`, ids, { withCredentials: true });
};

export const fetchBreeds = async () => {
  return axios.get(`${API_BASE}/dogs/breeds`, { withCredentials: true });
};

export const fetchLocations = async (city?: string, states?: string[]) => {
  return axios.post(`${API_BASE}/locations/search`, { city, states, size: 100 }, { withCredentials: true });
};

export const getLocations = async (zipCodes: string[]) => {
  return axios.post(`${API_BASE}/locations`, zipCodes, { withCredentials: true });
};