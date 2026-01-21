"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase-browser";

function LoginInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.refresh();
    router.push(next);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-[#111118] border border-[#27272a] rounded-2xl p-8 space-y-5"
      >
        <h1 className="text-2xl font-semibold text-center">
          Welcome to <span className="text-purple-500">Astryón</span>
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-md bg-black border border-[#27272a] px-4 py-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full rounded-md bg-black border border-[#27272a] px-4 py-3"
        />

        <button
          disabled={loading}
          className="w-full rounded-md bg-purple-600 py-3 font-semibold hover:bg-purple-700 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="pt-4 text-center text-sm text-white/60">
          Don’t have an account?{" "}
          <Link href="/auth/signup" className="text-purple-400 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default function LoginClient() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <LoginInner />
    </Suspense>
  );
}