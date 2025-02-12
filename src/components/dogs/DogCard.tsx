import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useDogStore } from "@/store/useDogStore";
import { Dog } from "@/interface/interface";

export default function DogCard({ dog }: { dog: Dog }) {
    const { locations, favoriteDogs, toggleFavorite } = useDogStore();

    return (
        <div data-testid="dog-card" className="relative border p-4 rounded-lg shadow-lg bg-white">
            <img src={dog.img} alt={dog.name} className="w-full h-48 object-cover rounded-md" />
            <h2 className="text-xl font-bold mt-3">{dog.name}</h2>
            <p className="text-gray-700">Breed: {dog.breed}</p>
            <p className="text-gray-700">Age: {dog.age}</p>
            <p className="text-gray-700">Location: {locations?.[dog.zip_code] ?? "Unknown"}</p>

            <button
                data-testid="favorite-button"
                onClick={() => toggleFavorite(dog.id)}
                className="absolute bottom-3 right-3 text-red-500 text-2xl transition-all duration-300 hover:scale-110"
            >
                {favoriteDogs.includes(dog.id) ? <BsHeartFill /> : <BsHeart />}
            </button>
        </div>
    );
}
