import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PodcastLibrary() {
    return (
        <>
            <TouchableOpacity style={styles.actionRow}>
                <View style={styles.actionIcon}>
                    <Ionicons name="mic-outline" size={26} color="#0d0d0d" />
                </View>
                <Text style={styles.actionText}>Your Liked Podcasts</Text>
            </TouchableOpacity>

            <Text style={styles.recentTitle}>A - Z</Text>

            <Text style={styles.emptyText}>No podcasts available</Text>
        </>
    );
}

const styles = StyleSheet.create({
    actionRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 18,
        paddingHorizontal: 20,
    },
    actionIcon: {
        backgroundColor: "#39d1d8",
        padding: 12,
        borderRadius: 50,
    },
    actionText: {
        color: "#fff",
        fontSize: 18,
        marginLeft: 15,
        fontWeight: "600",
    },
    recentTitle: {
        color: "#39d1d8",
        marginTop: 25,
        marginLeft: 20,
        fontSize: 16,
        fontWeight: "600",
    },
    emptyText: {
        color: "#888",
        textAlign: "center",
        marginTop: 20,
        fontSize: 16,
    },
});
