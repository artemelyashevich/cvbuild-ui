"use client";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

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
        borderBottom: "1pt solid black",
        paddingBottom: 4,
    },
    fieldRow: {
        marginBottom: 4,
        paddingLeft: 4,
    },
    label: {
        fontWeight: "bold",
    },
    listItem: {
        marginLeft: 10,
    },
});

function renderValue(value: any) {
    if (typeof value === "string" || typeof value === "number") {
        return <Text>{value}</Text>;
    }

    if (Array.isArray(value)) {
        return value.map((item, i) => (
            <View key={i} style={styles.fieldRow}>
                {typeof item === "object" ? (
                    Object.entries(item).map(([k, v]) => (
                        <Text key={k}>
                            <Text style={styles.label}>{k}: </Text>
                            {v}
                        </Text>
                    ))
                ) : (
                    <Text>• {item}</Text>
                )}
            </View>
        ));
    }

    if (typeof value === "object" && value !== null) {
        return Object.entries(value).map(([k, v]) => (
            <Text key={k}>
                <Text style={styles.label}>{k}: </Text>
                {v}
            </Text>
        ));
    }

    return null;
}

export default function ResumePDF({ data, sectionOrder }: any) {
    const blocks = data.blocks || {};

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {sectionOrder.map((section: string) => {
                    const content = blocks[section];
                    if (!content) return null;

                    return (
                        <View key={section} style={styles.section}>
                            <Text style={styles.sectionTitle}>{section}</Text>

                            {typeof content === "string" || typeof content === "number" ? (
                                <Text>{content}</Text>
                            ) : Array.isArray(content) ? (
                                content.map((item: any, i: number) => (
                                    <View key={i} style={styles.fieldRow}>
                                        {typeof item === "object" ? (
                                            Object.entries(item).map(([k, v]) => (
                                                <Text key={k}>
                                                    <Text style={styles.label}>{k}: </Text>
                                                    {v}
                                                </Text>
                                            ))
                                        ) : (
                                            <Text>• {item}</Text>
                                        )}
                                    </View>
                                ))
                            ) : typeof content === "object" ? (
                                Object.entries(content).map(([k, v]) => (
                                    <Text key={k}>
                                        <Text style={styles.label}>{k}: </Text>
                                        {v}
                                    </Text>
                                ))
                            ) : null}
                        </View>
                    );
                })}
            </Page>
        </Document>
    );
}