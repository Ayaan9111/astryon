export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold text-center mb-3">
          Plans
        </h1>
        <p className="text-center text-white/60 mb-14">
          Pay once or go classic. Build listings that actually sell.
        </p>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Classic */}
          <div className="rounded-xl border border-white/10 bg-neutral-900 p-8">
            <h2 className="text-xl font-semibold mb-1">Classic</h2>
            <p className="text-white/60 mb-6">Perfect to get started.</p>

            <p className="text-4xl font-bold mb-6">€19</p>

            <ul className="space-y-3 text-white/80 mb-8">
              <li>✓ 50 credits every month</li>
              <li>✓ AI listing generation</li>
              <li>✓ Basic support</li>
            </ul>

            <button
              disabled
              className="w-full rounded-md bg-white/10 py-3 font-semibold text-white/50 cursor-not-allowed"
            >
              Get Classic (soon)
            </button>
          </div>

          {/* Founding */}
          <div className="rounded-xl border border-purple-600 bg-neutral-900 p-8">
            <h2 className="text-xl font-semibold mb-1 text-purple-400">
              Founding Lifetime
            </h2>
            <p className="text-white/60 mb-6">
              One-time payment. Future-proof.
            </p>

            <p className="text-4xl font-bold mb-6">€139</p>

            <ul className="space-y-3 text-white/80 mb-8">
              <li>✓ Lifetime access</li>
              <li>✓ All future updates</li>
              <li>✓ 50 credits every month</li>
              <li>✓ Priority support</li>
            </ul>

            <button
              disabled
              className="w-full rounded-md bg-purple-600/40 py-3 font-semibold text-white/70 cursor-not-allowed"
            >
              Become a Founding (soon)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}