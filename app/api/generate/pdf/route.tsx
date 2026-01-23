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

    // ===== TITLE =====
    doc
      .font("Helvetica-Bold")
      .fontSize(22)
      .fillColor("#111")
      .text("Real Estate Listing", {
        align: "center",
      });

    doc.moveDown(1.5);

    // ===== BODY =====
    doc
      .font("Helvetica")
      .fontSize(12)
      .fillColor("#000")
      .text(listing, {
        align: "left",
        lineGap: 6,
      });

    doc.moveDown(3);

    // ===== FOOTER / WATERMARK =====
    doc
      .fontSize(9)
      .fillColor("gray")
      .text(
        "Generated with Astryón AI — Draft content, agents may edit before publishing",
        {
          align: "center",
        }
      );

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