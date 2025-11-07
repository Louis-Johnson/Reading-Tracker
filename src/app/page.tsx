"use client";

import BookList from "@/components/BookList";
import AddBookModal from "@/components/AddBookModal";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-700">My Library</h1>
          <AddBookModal />
        </div>

        <BookList />
      </div>
    </main>
  );
}
