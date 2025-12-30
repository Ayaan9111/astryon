import { NextRequest } from "next/server";
import PDFDocument from "pdfkit/js/pdfkit.standalone";
import { PassThrough } from "stream";

export async function POST(req: NextRequest) {
  try {
    const { listing } = await req.json();

    if (!listing) {
      return new Response("Missing listing", { status: 400 });
    }

    const doc = new PDFDocument({
      size: "A4",
      margin: 50,
    });

    const stream = new PassThrough();
    const chunks: Buffer[] = [];

    doc.pipe(stream);

    stream.on("data", (chunk) => chunks.push(chunk));

    doc
      .fontSize(20)
      .text("AI Generated Real Estate Listing", { align: "center" })
      .moveDown();

    doc
      .fontSize(12)
      .text(listing, { align: "left" });

    doc.moveDown(2);
    doc
      .fontSize(9)
      .fillColor("gray")
      .text("Generated with Astryón AI — Upgrade to remove watermark", {
        align: "center",
      });

    doc.end();

    await new Promise((resolve) => stream.on("end", resolve));

    const pdfBuffer = Buffer.concat(chunks);

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="listing.pdf"',
      },
    });
  } catch (err) {
    console.error("PDF ERROR:", err);
    return new Response("Failed to generate PDF", { status: 500 });
  }
}
