"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function AddBookForm() {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("FICTION");
  const [genre, setGenre] = useState("");
  const [form, setForm] = useState("");
  const [format, setFormat] = useState("PHYSICAL");
  const [languageCode, setLanguageCode] = useState("en");
  const [translator, setTranslator] = useState("");
  const [status, setStatus] = useState("TO_READ");
  const [notes, setNotes] = useState("");

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
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
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to add book");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      setTitle("");
      setAuthor("");
      setCategory("FICTION");
      setGenre("");
      setForm("");
      setFormat("PHYSICAL");
      setLanguageCode("en");
      setTranslator("");
      setStatus("TO_READ");
      setNotes("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate();
      }}
      className="mt-8 bg-white shadow-md rounded-lg p-6 space-y-4"
    >
      <h2 className="text-xl font-semibold mb-2">Add a Book</h2>

      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Book title"
          required
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Author</label>
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          required
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="FICTION">Fiction</option>
          <option value="NON_FICTION">Non-fiction</option>
        </select>
      </div>

      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Genre</label>
        <input
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Genre (e.g. Philosophy, Fantasy)"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Form</label>
        <input
          value={form}
          onChange={(e) => setForm(e.target.value)}
          placeholder="Form (e.g. Novel, Essay)"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Format</label>
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="PHYSICAL">Physical</option>
          <option value="EBOOK">Ebook</option>
          <option value="AUDIOBOOK">Audiobook</option>
        </select>
      </div>

      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Language code</label>
        <input
          value={languageCode}
          onChange={(e) => setLanguageCode(e.target.value)}
          placeholder='Language code (e.g. "en", "fr")'
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Translator</label>
        <input
          value={translator}
          onChange={(e) => setTranslator(e.target.value)}
          placeholder="Translator (if applicable)"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="TO_READ">To Read</option>
          <option value="READING">Reading</option>
          <option value="FINISHED">Finished</option>
        </select>
      </div>

      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium">Notes</label>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes..."
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-60 transition"
      >
        {mutation.isPending ? "Adding..." : "Add Book"}
      </button>

      {mutation.isError && (
        <p className="text-sm text-red-600 mt-2">
          {(mutation.error as Error).message}
        </p>
      )}
    </form>
  );
}
