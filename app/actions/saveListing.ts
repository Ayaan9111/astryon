"use server";

import { supabase } from "@/lib/supabaseClient";
import { cookies } from "next/headers";

export async function saveListing({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const cookieStore = cookies();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
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

  return { success: true };
}
