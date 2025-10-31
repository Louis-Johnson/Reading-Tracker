"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

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

export default function BookPage() {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading, error } = useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchBook(id),
    enabled: !!id,
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
    <main>
      <h1>{title}</h1>

      <div>
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
            <p>{notes}</p>
          </div>
        )}
        <p>Added on {new Date(createdAt).toLocaleDateString()}</p>
      </div>
    </main>
  );
}
