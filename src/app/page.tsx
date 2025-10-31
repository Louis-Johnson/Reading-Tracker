"use client";

import AddBookForm from "@/components/AddBookForm";
import BookList from "@/components/BookList";

export default function HomePage() {
  return (
    <main>
      <h1>My Reading Tracker</h1>
      <AddBookForm />
      <BookList />
    </main>
  );
}
