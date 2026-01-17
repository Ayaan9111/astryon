export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold text-center mb-3">
          Plans
        </h1>

        <p className="text-center text-white/60 mb-6">
          Astryón is an AI-powered real estate listing generator for agents and brokers.
        </p>

        <p className="text-center text-white/50 mb-14 max-w-2xl mx-auto">
          One credit equals one AI-generated luxury property listing. All paid plans
          include downloadable PDF exports and commercial usage rights.
        </p>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Classic */}
          <div className="rounded-xl border border-white/10 bg-neutral-900 p-8">
            <h2 className="text-xl font-semibold mb-1">Classic</h2>
            <p className="text-white/60 mb-6">Best for active agents.</p>

            <p className="text-4xl font-bold mb-6">€19 / month</p>

            <ul className="space-y-3 text-white/80 mb-8">
              <li>✓ 50 AI listing credits per month</li>
              <li>✓ Luxury real estate listings</li>
              <li>✓ Unlimited PDF exports</li>
              <li>✓ Commercial usage rights</li>
              <li>✓ Basic support</li>
            </ul>

            <button
              disabled
              className="w-full rounded-md bg-white/10 py-3 font-semibold text-white/50 cursor-not-allowed"
            >
              Get Classic (checkout coming soon)
            </button>
          </div>

          {/* Founding */}
          <div className="rounded-xl border border-purple-600 bg-neutral-900 p-8">
            <h2 className="text-xl font-semibold mb-1 text-purple-400">
              Founding Lifetime
            </h2>

            <p className="text-white/60 mb-6">
              One-time payment. Lifetime access.
            </p>

            <p className="text-4xl font-bold mb-6">€139</p>

            <ul className="space-y-3 text-white/80 mb-8">
              <li>✓ Lifetime access to Astryón</li>
              <li>✓ Monthly AI listing credits</li>
              <li>✓ Unlimited PDF downloads</li>
              <li>✓ All future updates included</li>
              <li>✓ Priority support</li>
            </ul>

            <button
              disabled
              className="w-full rounded-md bg-purple-600/40 py-3 font-semibold text-white/70 cursor-not-allowed"
            >
              Become a Founding Member (coming soon)
            </button>
          </div>
        </div>

        {/* Free plan clarification */}
        <p className="text-center text-white/50 mt-14">
          Free users receive 2 AI listing credits to try Astryón before upgrading.
        </p>
      </div>
    </div>
  );
}