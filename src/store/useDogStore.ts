import { create } from "zustand";
import { toast } from "react-toastify";
import {
  searchDogs,
  getDogDetails,
  fetchBreeds,
  fetchLocations,
  getLocations,
  getDogMatch,
} from "@/hooks/useDogs";
import { DogState, Location } from "@/interface/interface";


export const useDogStore = create<DogState>((set, get) => ({
  dogs: [],
  breeds: [],
  zipCodes: [],
  locations: {},
  selectedZipCode: "",
  totalPages: 0,
  totalResults: 0,
  page: 1,
  pageSize: 10,
  loading: false,
  selectedBreed: "",
  sortOrder: "asc",
  favoriteDogs: [],
  matchedDogLoading: false,
  matchedDog: null,
  ageMin: null,
  ageMax: null,

  setSelectedBreed: (breed) => {
    set({ selectedBreed: breed, page: 1 }),
      get().fetchDogs();
  },
  setSelectedZipCode: (zip) => { set({ selectedZipCode: zip, page: 1 }), get().fetchDogs(); },
  setPage: (page) => {
    set({ page });
    get().fetchDogs();
  },
  setAgeRange: (ageMin, ageMax) => { set({ ageMin, ageMax, page: 1 }), get().fetchDogs(); },

  toggleSortOrder: () => { set((state) => ({ sortOrder: state.sortOrder === "asc" ? "desc" : "asc" })), get().fetchDogs(); },

  toggleFavorite: (id) => {
    set((state) => ({
      favoriteDogs: state.favoriteDogs.includes(id)
        ? state.favoriteDogs.filter((dogId) => dogId !== id)
        : [...state.favoriteDogs, id],
    }));
  },

  fetchDogs: async () => {
    console.log("werewr===")
    set({ loading: true });
    try {
      const { selectedBreed, selectedZipCode, pageSize, page, sortOrder, ageMin, ageMax } = get();

      const filters: Record<string, string[] | number | string | undefined> = {
        breeds: selectedBreed ? [selectedBreed] : undefined,
        zipCodes: selectedZipCode ? [selectedZipCode] : undefined,
        size: pageSize,
        from: (page - 1) * pageSize,
        sort: `breed:${sortOrder}`,
        ageMin: ageMin ?? undefined,
        ageMax: ageMax ?? undefined,
      };

      Object.entries(filters).forEach(([key, value]) => {
        if (value === undefined) delete filters[key];
      });

      const res = await searchDogs(filters);
      const dogData = await getDogDetails(res.data.resultIds);

      set({
        dogs: dogData.data,
        totalResults: res.data.total,
        totalPages: Math.ceil(res.data.total / pageSize),
      });
    } catch (error) {
      toast.error("Failed to fetch dogs. Please try again.");
      console.error("Error fetching dogs:", error);
    }
    set({ loading: false });
  },

  fetchBreeds: async () => {
    try {
      const breedData = await fetchBreeds();
      set({ breeds: breedData.data });
    } catch (error) {
      toast.error("Failed to fetch breeds. Please try again.");
      console.error("Error fetching breeds:", error);
    }
  },

  fetchLocations: async () => {
    try {
      const locationData = await fetchLocations();
      const zipCodes = locationData.data.results.map((loc: Location) => loc.zip_code);
      const locationsResponse = await getLocations(zipCodes);

      const locations = locationsResponse.data.reduce((acc: Record<string, string>, loc: Location) => {
        acc[loc.zip_code] = `${loc.city}, ${loc.state}`;
        return acc;
      }, {});

      set({ zipCodes, locations });
    } catch (error) {
      toast.error("Failed to fetch locations. Please try again.");
      console.error("Error fetching locations:", error);
    }
  },

  generateMatch: async () => {
    set({ matchedDogLoading: true });
    try {
      const { favoriteDogs } = get();
      if (favoriteDogs.length === 0) {
        toast.warn("Select at least one dog to generate a match!");
        return;
      }

      const matchResponse = await getDogMatch(favoriteDogs);
      if (!matchResponse.data || !matchResponse.data.match) {
        throw new Error("No match found in response");
      }

      const matchedDogId = matchResponse.data.match;
      const dogDetails = await getDogDetails([matchedDogId]);

      if (dogDetails.data.length > 0) {
        set({ matchedDog: dogDetails.data[0] });
        toast.success("Match found successfully!");
      } else {
        toast.warn("No match found, please try again!");
      }
    } catch (error) {
      toast.error("Failed to generate match. Please try again.");
      console.error("Error generating match:", error);
    } finally {
      set({ matchedDogLoading: false });
    }
  },
}));
