"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/ui/field";

// Zod defines structure and rules for a valid book
const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  category: z.enum(["FICTION", "NON_FICTION"]),
  genre: z.string().optional(),
  form: z.string().optional(),
  format: z.enum(["PHYSICAL", "EBOOK", "AUDIOBOOK"]),
  languageCode: z.string().min(2, "Enter valid code like 'en'"),
  translator: z.string().optional(),
  status: z.enum(["TO_READ", "READING", "FINISHED"]),
  notes: z.string().optional(),
});

// Creates a TypeScript type automatically from the schema
type BookFormData = z.infer<typeof bookSchema>;

export default function BookForm() {
  const queryClient = useQueryClient(); // allows refetching cached data later

  // Create a form instance linked to the schema and default values
  const form = useForm<BookFormData>({
    resolver: zodResolver(bookSchema), // tells React Hook Form to validate with Zod
    defaultValues: {
      title: "",
      author: "",
      category: "FICTION",
      genre: "",
      form: "",
      format: "PHYSICAL",
      languageCode: "en",
      translator: "",
      status: "TO_READ",
      notes: "",
    },
  });

  // Define mutation for creating a new book
  const mutation = useMutation({
    // called when form submits valid data
    mutationFn: async (data: BookFormData) => {
      // send request to backend
      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to add book");
      return res.json();
    },
    onSuccess: () => {
      // called after successful mutation
      queryClient.invalidateQueries({ queryKey: ["books"] }); // tells React Query to refresh the book list
      form.reset(); // clears the form inputs
    },
  });

  // wraps submit handler with automatic validation
  const onSubmit = form.handleSubmit((data) => mutation.mutate(data));

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* TITLE FIELD */}
      <Field>
        <FieldLabel>Title</FieldLabel>
        <FieldContent>
          <Input
            placeholder="Book title"
            {...form.register("title")} // connects this input to React Hook Form
            className="w-full"
          />
          <FieldError errors={[form.formState.errors.title]} />{" "}
        </FieldContent>
      </Field>

      {/* AUTHOR FIELD */}
      <Field>
        <FieldLabel>Author</FieldLabel>
        <FieldContent>
          <Input
            placeholder="Author name"
            {...form.register("author")}
            className="w-full"
          />
          <FieldError errors={[form.formState.errors.author]} />
        </FieldContent>
      </Field>

      {/* CATEGORY DROPDOWN */}
      <Field>
        <FieldLabel>Category</FieldLabel>
        <FieldContent>
          <Select
            onValueChange={(val) =>
              form.setValue("category", val as "FICTION" | "NON_FICTION")
            }
            defaultValue={form.watch("category")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FICTION">Fiction</SelectItem>
              <SelectItem value="NON_FICTION">Non-fiction</SelectItem>
            </SelectContent>
          </Select>
          <FieldError errors={[form.formState.errors.category]} />
        </FieldContent>
      </Field>

      {/* STATUS DROPDOWN */}
      <Field>
        <FieldLabel>Status</FieldLabel>
        <FieldContent>
          <Select
            onValueChange={(val) =>
              form.setValue("status", val as "TO_READ" | "READING" | "FINISHED")
            }
            defaultValue={form.watch("status")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TO_READ">To Read</SelectItem>
              <SelectItem value="READING">Reading</SelectItem>
              <SelectItem value="FINISHED">Finished</SelectItem>
            </SelectContent>
          </Select>
          <FieldError errors={[form.formState.errors.status]} />
        </FieldContent>
      </Field>

      {/* Genre FIELD */}
      <Field>
        <FieldLabel>Genre</FieldLabel>
        <FieldContent>
          <Input
            placeholder="Fantasy, Biography..."
            {...form.register("genre")}
            className="w-full"
          />
          <FieldError errors={[form.formState.errors.genre]} />
        </FieldContent>
      </Field>

      {/* Form FIELD */}
      <Field>
        <FieldLabel>Text Form</FieldLabel>
        <FieldContent>
          <Input
            placeholder="Novel, Essay..."
            {...form.register("form")}
            className="w-full"
          />
          <FieldError errors={[form.formState.errors.form]} />
        </FieldContent>
      </Field>

      {/* FORMAT DROPDOWN */}
      <Field>
        <FieldLabel>Format</FieldLabel>
        <FieldContent>
          <Select
            onValueChange={(val) =>
              form.setValue("format", val as "PHYSICAL" | "EBOOK" | "AUDIOBOOK")
            }
            defaultValue={form.watch("format")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PHYSICAL">Physical</SelectItem>
              <SelectItem value="EBOOK">Ebook</SelectItem>
              <SelectItem value="AUDIOBOOK">Audiobook</SelectItem>
            </SelectContent>
          </Select>
          <FieldError errors={[form.formState.errors.format]} />
        </FieldContent>
      </Field>

      {/* LANGUAGE FIELD */}
      <Field>
        <FieldLabel>Language</FieldLabel>
        <FieldContent>
          <Input
            placeholder="en, fr, es..."
            {...form.register("languageCode")}
            className="w-full"
          />
          <FieldError errors={[form.formState.errors.languageCode]} />
        </FieldContent>
      </Field>

      {/* TRANSLATOR FIELD */}
      <Field>
        <FieldLabel>Translator</FieldLabel>
        <FieldContent>
          <Input
            placeholder="Translator name"
            {...form.register("translator")}
            className="w-full"
          />
          <FieldError errors={[form.formState.errors.translator]} />
        </FieldContent>
      </Field>

      {/* SUBMIT BUTTON */}
      <Button
        type="submit"
        className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Adding..." : "Add Book"}{" "}
      </Button>
    </form>
  );
}
