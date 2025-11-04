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

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } },
) {
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
