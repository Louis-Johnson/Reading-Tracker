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
  // Syntax needs explaining
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
    <ul className="space-y-2">
      {data.map((book) => (
        <li key={book.id}>
          <Link href={`/book/${book.id}`}>
            <p>{book.title}</p>
            <p>{book.author}</p>
            <p>{book.status}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
