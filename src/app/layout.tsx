import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers";

export const metadata: Metadata = {
  title: "Reading Tracker",
  description: "A full-stack app for tracking your reading progress",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-100 text-gray-900 antialiased">
        <Providers>
          <div className="max-w-3xl mx-auto px-4 py-8">
            <header className="mb-10 border-b pb-4">
              <h1 className="text-3xl font-bold text-indigo-700">
                Reading Tracker
              </h1>
            </header>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
