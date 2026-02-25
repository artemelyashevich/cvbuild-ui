"use client";

import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 12,
        fontFamily: "Helvetica",
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        marginBottom: 6,
        fontWeight: "bold",
        borderBottom: "1 solid #000",
        paddingBottom: 4,
    },
    fieldRow: {
        marginBottom: 4,
    },
    label: {
        fontWeight: "bold",
    },
});

export default function ResumePDF({
                                      data,
                                      sectionOrder,
                                  }: any) {
    const blocks = data.blocks || {};

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {sectionOrder.map((section: string) => (
                    <View key={section} style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            {section}
                        </Text>

                        {Object.entries(blocks[section] || {}).map(
                            ([key, value]: any) => (
                                <View key={key} style={styles.fieldRow}>
                                    {typeof value === "string" ||
                                    typeof value === "number" ? (
                                        <Text>
                                            <Text style={styles.label}>
                                                {key}:{" "}
                                            </Text>
                                            {value}
                                        </Text>
                                    ) : Array.isArray(value) ? (
                                        value.map((item: string, i: number) => (
                                            <Text key={i}>• {item}</Text>
                                        ))
                                    ) : null}
                                </View>
                            )
                        )}
                    </View>
                ))}
            </Page>
        </Document>
    );
}