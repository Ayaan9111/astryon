export default function RefundPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-white">
      <h1 className="text-3xl font-bold mb-6">Refund Policy</h1>

      <p className="text-white/70 mb-4">
        Astryón uses Paddle as its Merchant of Record. This means all payments,
        refunds, and chargebacks are handled directly by Paddle.
      </p>

      <p className="text-white/70 mb-4">
        If you are a consumer, you may be entitled to a refund in accordance with
        Paddle’s refund policy and applicable consumer protection laws, including
        a 14-day right of withdrawal where required by law.
      </p>

      <p className="text-white/70 mb-4">
        Refund requests are reviewed and processed solely by Paddle according to
        their official refund policy.
      </p>

      <p className="text-white/70 mb-6">
        You can review Paddle’s full refund policy here:
      </p>

      <a
        href="https://www.paddle.com/legal/refunds"
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-400 underline"
      >
        https://www.paddle.com/legal/refunds
      </a>

      <h2 className="text-xl font-semibold mt-10 mb-2">Contact</h2>
      <p className="text-white/70">
        For product-related questions, contact us at{" "}
        <a
          href="mailto:support@astryon.in"
          className="text-purple-400 underline"
        >
          support@astryon.in
        </a>
        . For refunds, Paddle support will assist you directly.
      </p>
    </div>
  );
}