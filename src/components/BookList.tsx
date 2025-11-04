"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

type Book = {
  id: number;
  title: string;
  author: string;
  status: string;
};

async function fetchBooks(): Promise<Book[]> {
  const res = await fetch("/api/books");
  if (!res.ok) throw new Error("Failed to fetch books");
  return res.json();
}

export default function BookList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching books.</p>;

  if (!data || data.length === 0)
    return <p>No books yet — add your first one!</p>;

  return (
    <ul className="space-y-4">
      {data.map((book) => (
        <li
          key={book.id}
          className="bg-white shadow-sm rounded-lg p-4 hover:shadow-md transition"
        >
          <Link href={`/book/${book.id}`} className="block">
            <h2 className="text-lg font-semibold text-indigo-600 hover:underline">
              {book.title}
            </h2>
            <p className="text-gray-700">{book.author}</p>
            <p className="text-sm text-gray-500">{book.status}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
