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
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Book title"
        required
      />
      <input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
        required
      />

      <div>
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="FICTION">Fiction</option>
          <option value="NON_FICTION">Non-fiction</option>
        </select>
      </div>

      <input
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        placeholder="Genre (e.g. Philosophy, Fantasy)"
      />
      <input
        value={form}
        onChange={(e) => setForm(e.target.value)}
        placeholder="Form (e.g. Novel, Essay)"
      />

      <div>
        <label>Format</label>
        <select value={format} onChange={(e) => setFormat(e.target.value)}>
          <option value="PHYSICAL">Physical</option>
          <option value="EBOOK">Ebook</option>
          <option value="AUDIOBOOK">Audiobook</option>
        </select>
      </div>

      <input
        value={languageCode}
        onChange={(e) => setLanguageCode(e.target.value)}
        placeholder='Language code (e.g. "en", "fr")'
      />

      <input
        value={translator}
        onChange={(e) => setTranslator(e.target.value)}
        placeholder="Translator (if applicable)"
      />

      <div>
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="TO_READ">To Read</option>
          <option value="READING">Reading</option>
          <option value="FINISHED">Finished</option>
        </select>
      </div>

      <textarea
        rows={3}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notes..."
      />

      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Adding..." : "Add Book"}
      </button>

      {mutation.isError && <p>{(mutation.error as Error).message}</p>}
    </form>
  );
}
