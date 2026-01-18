export default function RefundPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Refund Policy</h1>

      <p className="mb-4">
        Astryón uses Paddle as its Merchant of Record. This means all payments,
        refunds, and chargebacks are handled securely by Paddle.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">Refund Window</h2>

      <p className="mb-4">
        Customers are eligible for a full refund within <strong>14 days</strong>{" "}
        of the original purchase date.
      </p>

      <p className="mb-4">
        All refund requests must be submitted within this 14-day period.
        Requests made after 14 days from the purchase date are not eligible
        for a refund.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">Refund Processing</h2>

      <p className="mb-4">
        Refund requests are reviewed and processed solely by Paddle in
        accordance with their official refund policy and applicable consumer
        protection laws.
      </p>

      <p className="mb-4">
        You can review Paddle’s full refund policy here:{" "}
        <a
          href="https://www.paddle.com/legal/refunds"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          https://www.paddle.com/legal/refunds
        </a>
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">Contact</h2>

      <p>
        For product-related questions, please contact us at{" "}
        <a
          href="mailto:support@astryon.in"
          className="underline"
        >
          support@astryon.in
        </a>
        . For refund requests, Paddle Support will assist you directly.
      </p>
    </main>
  );
}