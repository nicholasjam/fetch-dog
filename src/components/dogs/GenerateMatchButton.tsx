import { useState } from "react";
import { useDogStore } from "@/store/useDogStore";

interface GenerateMatchButtonProps {
  setShowMatchResult: (show: boolean) => void; // Explicitly define prop type
}

export default function GenerateMatchButton({ setShowMatchResult }: GenerateMatchButtonProps) {
  const { generateMatch } = useDogStore();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await generateMatch();
    setLoading(false);
    setShowMatchResult(true); // Show match result box after generating
  };

  return (
    <div className="mt-8 text-center">
      <button
        onClick={handleClick}
        className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition-all flex items-center gap-2"
        disabled={loading}
      >
        {loading ? (
          <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
        ) : (
          "Generate Match"
        )}
      </button>
    </div>
  );
}
