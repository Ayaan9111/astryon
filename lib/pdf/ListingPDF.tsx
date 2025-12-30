import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    lineHeight: 1.6,
  },
  title: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: "bold",
  },
  body: {
    whiteSpace: "pre-wrap",
  },
});

export default function ListingPDF({ listing }: { listing: string }) {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>Real Estate Listing</Text>
        <Text style={styles.body}>{listing}</Text>
      </Page>
    </Document>
  );
}