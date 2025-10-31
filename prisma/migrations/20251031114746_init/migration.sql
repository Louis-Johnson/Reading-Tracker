-- CreateEnum
CREATE TYPE "Category" AS ENUM ('FICTION', 'NON_FICTION');

-- CreateEnum
CREATE TYPE "Format" AS ENUM ('PHYSICAL', 'EBOOK', 'AUDIOBOOK');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('TO_READ', 'READING', 'FINISHED');

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "genre" TEXT,
    "form" TEXT,
    "format" "Format" NOT NULL DEFAULT 'PHYSICAL',
    "languageCode" TEXT NOT NULL DEFAULT 'en',
    "translator" TEXT,
    "status" "Status" NOT NULL DEFAULT 'TO_READ',
    "rating" INTEGER,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
