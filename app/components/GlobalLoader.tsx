"use client";

import { useLoader } from "@/app/context/loader";

export default function GlobalLoader() {
  const { loading } = useLoader();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-purple-400 text-sm tracking-wide">
          Loading…
        </p>
      </div>
    </div>
  );
}
