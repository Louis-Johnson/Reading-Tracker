import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
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
    } = body;

    if (!title || !author || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const Category = ["FICTION", "NON_FICTION"] as const;
    const Status = ["TO_READ", "READING", "FINISHED"] as const;
    const Format = ["PHYSICAL", "EBOOK", "AUDIOBOOK"] as const;

    if (!Category.includes(category)) {
      return NextResponse.json(
        { error: "Invalid category enum" },
        { status: 400 },
      );
    }
    if (status && !Status.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status enum" },
        { status: 400 },
      );
    }
    if (format && !Format.includes(format)) {
      return NextResponse.json(
        { error: "Invalid format enum" },
        { status: 400 },
      );
    }

    const newBook = await prisma.book.create({
      data: {
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
      },
    });

    return NextResponse.json(newBook, { status: 201 });
  } catch (error: any) {
    console.error("Error creating book:", error.message || error);
    return NextResponse.json(
      { error: "Failed to create book" },
      { status: 500 },
    );
  }
}
