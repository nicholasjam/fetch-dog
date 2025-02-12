import { useDogStore } from "@/store/useDogStore";

export default function MatchResult() {
    const { matchedDog, locations } = useDogStore();

    return (
        <div className="mt-10 text-center p-6 border rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-bold">🐾 Your Perfect Match!</h2>
            <img src={matchedDog?.img} alt={matchedDog?.name} className="w-48 h-48 object-cover mx-auto rounded-md mt-3" />
            <h3 className="text-xl font-semibold mt-2">{matchedDog?.name}</h3>
            <p className="text-gray-700">Breed: {matchedDog?.breed}</p>
            <p className="text-gray-700">Age: {matchedDog?.age}</p>
            <p className="text-gray-700">Location: {locations?.[matchedDog?.zip_code || ''] ?? "Unknown"}</p>
        </div>
    );
}
