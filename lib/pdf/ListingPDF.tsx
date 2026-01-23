import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontSize: 11,
    lineHeight: 1.7,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 10,
    color: "#666",
    marginBottom: 20,
  },
  body: {
    whiteSpace: "pre-wrap",
  },
  footer: {
    marginTop: 30,
    fontSize: 9,
    color: "#888",
    textAlign: "center",
  },
});

export default function ListingPDF({ listing }: { listing: string }) {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>Real Estate Listing</Text>
        <Text style={styles.subtitle}>
          AI-generated draft — editable by real estate agents
        </Text>

        <Text style={styles.body}>{listing}</Text>

        <Text style={styles.footer}>
          Generated with Astryón AI
        </Text>
      </Page>
    </Document>
  );
}