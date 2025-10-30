"use client";

import { useQuery } from "@tanstack/react-query";

async function fetchPing() {
  const res = await fetch("/api/ping");
  if (!res.ok) throw new Error("Ping failed");
  return res.json() as Promise<{ ok: boolean; now: string }>;
}

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["ping"],
    queryFn: fetchPing,
    staleTime: 5_000,
  });

  return (
    <main className="mx-auto max-w-2xl p-8 space-y-4">
      <h1 className="text-2xl font-bold">Reading Tracker</h1>

      {isLoading && <p>Loading ping...</p>}
      {error && <p>Something went wrong.</p>}
      {data && (
        <div className="rounded border bg-white p-4">
          <div className="text-black">Server says ok: {String(data.ok)}</div>
          <div className="text-sm text-gray-600">Server time: {data.now}</div>
        </div>
      )}
    </main>
  );
}
