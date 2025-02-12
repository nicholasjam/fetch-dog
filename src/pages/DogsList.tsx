import { useEffect, useState } from "react";
import { useDogStore } from "@/store/useDogStore";
import { useAuthStore } from "@/store/useAuthStore";
import { Loader } from "@/components/loader/Loader";
import Filters from "@/components/dogs/Filters";
import DogCard from "@/components/dogs/DogCard";
import Pagination from "@/components/dogs/Pagination";
import GenerateMatchButton from "@/components/dogs/GenerateMatchButton";
import MatchResult from "@/components/dogs/MatchResult";

export default function DogsList() {
  const {
    dogs,
    totalResults,
    loading,
    favoriteDogs,
    matchedDog,
    fetchDogs,
    fetchBreeds,
    fetchLocations,
    matchedDogLoading,
  } = useDogStore();
  const [showMatchResult, setShowMatchResult] = useState(true);

  const { logout } = useAuthStore();

  useEffect(() => {
    fetchBreeds();
    fetchLocations();
  }, [fetchBreeds, fetchLocations]);

  useEffect(() => {
    fetchDogs();
  }, [fetchDogs]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200 p-8">
      <div onClick={logout} className="cursor-pointer text-red-600 font-bold">
        Logout
      </div>

      <div className="max-w-6xl mx-auto bg-white p-6 shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Find Your Furry Friend!
        </h1>

        <Filters />

        {loading ? (
          <div className="flex justify-center items-center w-full h-96">
            <Loader />
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {dogs.map((dog) => (
                <DogCard key={dog.id} dog={dog} />
              ))}
            </div>

            <p className="text-center mt-4">Total Results: {totalResults}</p>
          </div>
        )}

        <Pagination />
      </div>

      {favoriteDogs.length > 0 && (
        <div className="fixed bottom-8 right-8 z-50">
          <GenerateMatchButton setShowMatchResult={setShowMatchResult} />
        </div>
      )}

      {matchedDogLoading ? (
        <div className="fixed bottom-20 right-10 bg-white shadow-lg rounded-lg p-4 border border-yellow-400 animate-fade-in">
          <Loader />
        </div>
      ) : matchedDog && showMatchResult ? (
        <div className="fixed bottom-20 right-10 bg-white shadow-lg rounded-lg p-4 border border-yellow-400 animate-fade-in w-80">
          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-lg font-bold"
            onClick={() => setShowMatchResult(false)}
          >
            ❌
          </button>
          <h2 className="text-xl font-bold text-gray-800 text-center mb-2">
            🐾 Your Perfect Match!
          </h2>
          <MatchResult />
        </div>
      ) : null}
    </div>
  );
}
