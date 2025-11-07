"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import BookForm from "./BookForm";

export default function AddBookModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Book</Button>
      </DialogTrigger>

      <DialogContent
        className="
          sm:max-w-[600px]
          max-h-[85vh]
          overflow-y-auto
          p-6
        "
      >
        <DialogHeader>
          <DialogTitle>Add a New Book</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new book to your library.
          </DialogDescription>
        </DialogHeader>

        <BookForm />
      </DialogContent>
    </Dialog>
  );
}
