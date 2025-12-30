"use server";

import { createServerSupabaseClient } from "@/lib/supabase-server";

export async function saveListing({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const { error } = await supabase.from("listings").insert({
    user_id: user.id,
    title,
    content,
  });

  if (error) {
    throw new Error(error.message);
  }
}