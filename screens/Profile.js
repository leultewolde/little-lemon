import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import ProfileAvatar from "../components/ProfileAvatar";
import ProfileForm from "../components/ProfileForm";


export default function Profile() {
    return (
        <ScrollView style={styles.scollContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Personal Information</Text>
                <ProfileAvatar />
                <ProfileForm />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scollContainer: {
        flex: 1,
        backgroundColor: "#fff"
    },
    container: {
        flex: 1,
        padding: 12
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 10
    }
});
