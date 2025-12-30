"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLoader } from "@/app/context/loader";

export default function RouteLoader() {
  const pathname = usePathname();
  const { show, hide } = useLoader();

  useEffect(() => {
    show();
    const timeout = setTimeout(hide, 300);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
