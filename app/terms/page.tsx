export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-white">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

      <p className="text-white/70 mb-4">
        By using Astryón, you agree to these terms.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Service</h2>
      <p className="text-white/70 mb-4">
        Astryón provides AI-powered listing generation tools. We do not guarantee
        specific business outcomes.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Accounts</h2>
      <p className="text-white/70 mb-4">
        You are responsible for maintaining the security of your account.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Payments</h2>
      <p className="text-white/70 mb-4">
        Subscriptions and purchases are handled by Paddle. Pricing may change at
        any time.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Termination</h2>
      <p className="text-white/70 mb-4">
        We reserve the right to suspend or terminate accounts that violate these
        terms.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Contact</h2>
      <p className="text-white/70">
        Questions? Email{" "}
        <a
          href="mailto:support@astryon.in"
          className="text-purple-400 underline"
        >
          support@astryon.in
        </a>
      </p>
    </div>
  );
}