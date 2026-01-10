export default function RefundPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-white">
      <h1 className="text-3xl font-bold mb-6">Refund Policy</h1>

      <p className="text-white/70 mb-4">
        We aim to be transparent and fair with refunds.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Digital Product</h2>
      <p className="text-white/70 mb-4">
        Astryón is a digital service. Once credits are used, refunds are generally
        not provided.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Exceptions</h2>
      <p className="text-white/70 mb-4">
        If you experience a technical issue that prevents usage, contact us within
        7 days and we will review your request.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Payments</h2>
      <p className="text-white/70 mb-4">
        All refunds are processed through Paddle according to their policies.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Contact</h2>
      <p className="text-white/70">
        Reach us at{" "}
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