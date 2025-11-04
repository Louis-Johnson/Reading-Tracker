import { NextResponse } from "next/server";
import prisma from "@/lib/db";

type Params = {
  params: { id: string };
};

export async function GET(_request: Request, { params }: Params) {
  try {
    const bookId = parseInt(params.id, 10);

    if (isNaN(bookId)) {
      return NextResponse.json({ error: "Invalid book ID" }, { status: 400 });
    }

    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json(book);
  } catch (error) {
    console.error("Error fetching book:", error);
    return NextResponse.json(
      { error: "Failed to fetch book" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const bookId = parseInt(params.id, 10);
    if (isNaN(bookId)) {
      return NextResponse.json({ error: "Invalid book ID" }, { status: 400 });
    }

    const deletedBook = await prisma.book.delete({
      where: { id: bookId },
    });

    return NextResponse.json(deletedBook, { status: 200 });
  } catch (error) {
    console.error("Error deleting book:", error);
    return NextResponse.json(
      { error: "Failed to delete book" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const bookId = parseInt(params.id, 10);
    if (isNaN(bookId)) {
      return NextResponse.json({ error: "Invalid book ID" }, { status: 400 });
    }

    const data = await request.json();

    const updatedBook = await prisma.book.update({
      where: { id: bookId },
      data: {
        title: data.title,
        author: data.author,
        category: data.category,
        genre: data.genre || null,
        form: data.form || null,
        format: data.format,
        languageCode: data.languageCode,
        translator: data.translator || null,
        status: data.status,
        notes: data.notes || null,
      },
    });

    return NextResponse.json(updatedBook, { status: 200 });
  } catch (error) {
    console.error("Error updating book:", error);
    return NextResponse.json(
      { error: "Failed to update book" },
      { status: 500 },
    );
  }
}
