export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-white">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="text-white/70 mb-4">
        Astryón respects your privacy. This policy explains how we collect, use,
        and protect your information.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Information We Collect</h2>
      <p className="text-white/70 mb-4">
        We collect basic account information such as email address and usage data
        required to provide our services.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">How We Use Data</h2>
      <p className="text-white/70 mb-4">
        Your data is used solely to operate and improve the Astryón platform,
        manage subscriptions, and provide customer support.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Third Parties</h2>
      <p className="text-white/70 mb-4">
        Payments are processed by Paddle. We do not store your payment details.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Contact</h2>
      <p className="text-white/70">
        For privacy concerns, contact us at{" "}
        <a
          href="mailto:support@astryon.in"
          className="text-purple-400 underline"
        >
          support@astryon.in
        </a>
        .
      </p>
    </div>
  );
}