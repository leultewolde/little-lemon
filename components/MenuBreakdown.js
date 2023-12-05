import { StyleSheet, Text, View } from "react-native";

const dishes = [
    "Starters",
    "Mains",
    "Desserts",
    "Drinks",
]

export default function MenuBreakdown() {

    function Item({ dish }) {
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.itemText}>{dish}</Text>
            </View>
        );
    }

    const renderItems = dishes.map((dish, index) =>
        (<Item key={index} dish={dish} />));

    return (
        <View style={styles.container}>
            <Text style={styles.title}>ORDER FOR DELIVERY!</Text>
            <View style={styles.itemsContainer}>
                {renderItems}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
        borderBottomWidth: 0.75
    },
    title: {
        fontSize: 25,
        fontWeight: "bold"
    },
    itemsContainer: {
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    itemContainer: {
        backgroundColor: "#fff",
        elevation: 2,
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 8
    },
    itemText: {
        fontSize: 18,
        color: "#495E57",
        fontWeight: "bold"
    }
});