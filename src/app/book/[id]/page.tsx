"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

type Book = {
  id: number;
  title: string;
  author: string;
  category: string;
  genre?: string | null;
  form?: string | null;
  format: string;
  languageCode: string;
  translator?: string | null;
  status: string;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
};

async function fetchBook(id: string): Promise<Book> {
  const res = await fetch(`/api/books/${id}`);
  if (!res.ok) throw new Error("Failed to fetch book");
  return res.json();
}

async function deleteBook(id: string) {
  const res = await fetch(`/api/books/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete book");
  return res.json();
}

export default function BookPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchBook(id),
    enabled: !!id,
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteBook(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });

      router.push("/");
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading book.</p>;
  if (!data) return <p>Book not found.</p>;

  const {
    title,
    author,
    category,
    genre,
    form,
    format,
    languageCode,
    translator,
    status,
    notes,
    createdAt,
  } = data;

  return (
    <main className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold text-indigo-700 mb-4">{title}</h1>

      <div className="space-y-2 text-gray-700">
        <p>
          <strong>Author:</strong> {author}
        </p>
        <p>
          <strong>Category:</strong> {category}
        </p>
        {genre && (
          <p>
            <strong>Genre:</strong> {genre}
          </p>
        )}
        {form && (
          <p>
            <strong>Form:</strong> {form}
          </p>
        )}
        <p>
          <strong>Format:</strong> {format}
        </p>
        <p>
          <strong>Language:</strong> {languageCode}
        </p>
        {translator && (
          <p>
            <strong>Translator:</strong> {translator}
          </p>
        )}
        <p>
          <strong>Status:</strong> {status}
        </p>
        {notes && (
          <div>
            <strong>Notes:</strong>
            <p className="mt-1 text-gray-600 italic">{notes}</p>
          </div>
        )}
        <p className="text-sm text-gray-500">
          Added on {new Date(createdAt).toLocaleDateString()}
        </p>

        <button
          onClick={() => {
            if (confirm("Are you sure you want to delete this book?")) {
              deleteMutation.mutate();
            }
          }}
          disabled={deleteMutation.isPending}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          {deleteMutation.isPending ? "Deleting..." : "Delete Book"}
        </button>
        {deleteMutation.isError && (
          <p className="text-red-600 mt-2">Error deleting book.</p>
        )}
      </div>
    </main>
  );
}
