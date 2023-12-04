import React from "react";
import { View, Text, Image, TextInput, StyleSheet, ActivityIndicator } from "react-native";
import Button from "../components/Button";


export default function Splash() {
    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome to Little Lemon</Text>
            <ActivityIndicator size="large" />
            <Text>Loading...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#d5e1f5",
        justifyContent: "center",
        alignItems: "center"
    },
    welcomeText: {
        fontSize: 25,
        marginVertical: 15
    }
});
