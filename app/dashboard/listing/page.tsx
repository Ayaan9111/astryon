import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";

type Listing = {
  id: string;
  title: string;
  description: string;
  created_at: string;
};

export default async function ListingsPage() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: listings, error } = await supabase
    .from("listings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="p-6 text-red-500">
        Error loading listings: {error.message}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Listings</h1>

      {listings.length === 0 ? (
        <p className="text-gray-400">No listings yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {listings.map((listing: Listing) => (
            <div
              key={listing.id}
              className="rounded-xl border border-white/10 bg-black p-5 shadow"
            >
              <h2 className="text-lg font-semibold mb-2">
                {listing.title}
              </h2>
              <p className="text-sm text-gray-300 whitespace-pre-wrap">
                {listing.description}
              </p>
              <p className="mt-3 text-xs text-gray-500">
                {new Date(listing.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
