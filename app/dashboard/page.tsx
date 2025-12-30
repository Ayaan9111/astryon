import { createServerSupabaseClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-4">
        Dashboard
      </h1>

      <p className="text-white/70">
        Welcome back. Generate listings that actually sell.
      </p>
    </div>
  );
}
