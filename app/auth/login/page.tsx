"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password) {
      alert("Enter email & password bro 😐");
      return;
    }

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

    // ✅ SUCCESS → DASHBOARD
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md rounded-xl bg-neutral-900 border border-neutral-800 p-8 shadow-xl">
        <h1 className="mb-6 text-center text-2xl font-bold text-white">
          Welcome to <span className="text-purple-500">Astryón</span>
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full rounded-md border border-neutral-700
              bg-black px-4 py-2 text-white
              placeholder-gray-400
              focus:ring-2 focus:ring-purple-500
              focus:outline-none
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full rounded-md border border-neutral-700
              bg-black px-4 py-2 text-white
              placeholder-gray-400
              focus:ring-2 focus:ring-purple-500
              focus:outline-none
            "
          />

          <button
            type="submit"
            disabled={loading}
            className="
              w-full rounded-md bg-purple-600 py-2
              font-semibold text-white
              hover:bg-purple-700
              transition
              disabled:opacity-60
            "
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-4 text-center">
          Don’t have an account?{" "}
          <a
            href="/auth/signup"
            className="text-purple-400 hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
