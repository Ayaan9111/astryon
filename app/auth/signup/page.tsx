"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase-browser";

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password) {
      alert("Email & password required");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      alert(error.message);
      return;
    }

    // 🔥 Auto login after signup
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);
    router.refresh();
    router.push(next);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md rounded-xl bg-neutral-900 border border-neutral-800 p-8 space-y-5">
        <h1 className="text-center text-2xl font-bold text-white">
          Create your <span className="text-purple-500">Astryón</span> account
        </h1>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-md bg-black border border-neutral-700 px-4 py-3 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-md bg-black border border-neutral-700 px-4 py-3 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-purple-600 py-3 font-semibold hover:bg-purple-700 disabled:opacity-60"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        {/* 🔗 LOGIN LINK */}
        <p className="pt-2 text-center text-sm text-white/60">
          Already have an account?{" "}
          <Link
            href={`/auth/login?next=${encodeURIComponent(next)}`}
            className="text-purple-400 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}