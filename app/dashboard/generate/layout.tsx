"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "../../../lib/supabase-browser";

export default function GenerateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        router.push("/auth/login");
      } else {
        setLoading(false);
      }
    };

    checkSession();
  }, [router, supabase]);

  if (loading) return <div className="p-6">Checking auth...</div>;

  return <>{children}</>;
}
