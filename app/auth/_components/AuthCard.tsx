import Link from "next/link";

export default function AuthCard({
  title,
  description,
  children,
  type,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  type: "login" | "signup";
}) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-950 p-8 text-white">
        
        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-2 text-center">
          {title}
        </h1>
        <p className="text-white/60 text-center mb-8">
          {description}
        </p>

        {/* FORM */}
        {children}

        {/* SWITCH AUTH */}
        <p className="mt-6 text-center text-sm text-white/60">
          {type === "login" ? (
            <>
              Don’t have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-purple-400 hover:underline"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-purple-400 hover:underline"
              >
                Log in
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}