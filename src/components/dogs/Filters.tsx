import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { useDogStore } from "@/store/useDogStore";

export default function Filters() {
  const {
    breeds, zipCodes, locations, selectedBreed, selectedZipCode, sortOrder,
    ageMin, ageMax, setSelectedBreed, setSelectedZipCode, setAgeRange, toggleSortOrder
  } = useDogStore();

  return (
    <div className="flex flex-wrap gap-4 items-center mb-6">
      <select className="p-3 border rounded-lg" value={selectedBreed} onChange={(e) => setSelectedBreed(e.target.value)}>
        <option value="">All Breeds</option>
        {breeds.map((breed) => <option key={breed} value={breed}>{breed}</option>)}
      </select>

      <select className="p-3 border rounded-lg" value={selectedZipCode} onChange={(e) => setSelectedZipCode(e.target.value)}>
        <option value="">All Locations</option>
        {zipCodes.map((zip) => (
          <option key={zip} value={zip}>{zip} ({locations?.[zip] ?? "Unknown"})</option>
        ))}
      </select>

      <input type="number" placeholder="Min Age" className="p-3 border rounded-lg" value={ageMin ?? ""}
        onChange={(e) => {
          const value = e.target.value;
          if (/^[0-9]*$/.test(value)) {
            const newMin = value === "" ? null : Number(value);
            if (newMin !== null && (ageMax !== null && newMin >= ageMax)) {
              alert("Min Age must be less than Max Age");
            } else {
              setAgeRange(newMin, ageMax);
            }
          }
        }}
      />
      {ageMin !== null && ageMax !== null && ageMin >= ageMax && (
        <span className="text-red-500">Min Age must be less than Max Age</span>
      )}

      <input type="number" placeholder="Max Age" className="p-3 border rounded-lg" value={ageMax ?? ""}
        onChange={(e) => {
          const value = e.target.value;
          if (/^[0-9]*$/.test(value)) {
            const newMax = value === "" ? null : Number(value);
            if (newMax !== null && (ageMin !== null && newMax <= ageMin)) {
              alert("Max Age must be greater than Min Age");
            } else {
              setAgeRange(ageMin, newMax);
            }
          }
        }}
      />
      {ageMin !== null && ageMax !== null && ageMax <= ageMin && (
        <span className="text-red-500">Max Age must be greater than Min Age</span>
      )}

      <button
        onClick={toggleSortOrder}
        className="p-2 h-12 w-12 flex justify-center items-center border rounded-lg"
        title="Filter"
      >
        {sortOrder === "asc" ? <AiOutlineSortAscending size={24} /> : <AiOutlineSortDescending size={24} />}
      </button>
    </div>
  );
}
