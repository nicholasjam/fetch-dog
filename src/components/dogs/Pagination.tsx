import { useDogStore } from "@/store/useDogStore";

export default function Pagination() {
  const { page, totalPages, setPage } = useDogStore();

  return (
    <div className="flex justify-center mt-6 gap-4">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page <= 1}
        className={`px-4 py-2 border rounded ${page <= 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
      >
        Previous
      </button>

      <span className="px-4 py-2 border rounded bg-gray-100">Page {page} of {totalPages}</span>

      <button
        onClick={() => setPage(page + 1)}
        disabled={page >= totalPages}
        className={`px-4 py-2 border rounded ${page >= totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
        data-testid="next-page"
      >
        Next
      </button>
    </div>
  );
}
