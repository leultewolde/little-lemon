import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

export default function Loading() {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
            <Text>Loading...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center"
    }
});