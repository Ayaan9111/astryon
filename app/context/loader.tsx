"use client";

import { createContext, useContext, useState } from "react";

type LoaderContextType = {
  loading: boolean;
  show: () => void;
  hide: () => void;
};

const LoaderContext = createContext<LoaderContextType | null>(null);

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider
      value={{
        loading,
        show: () => setLoading(true),
        hide: () => setLoading(false),
      }}
    >
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const context = useContext(LoaderContext);
  if (!context) throw new Error("useLoader must be used inside LoaderProvider");
  return context;
}
