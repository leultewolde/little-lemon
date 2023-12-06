import { StyleSheet, Text, View, ScrollView } from "react-native";
import MenuCategory from "./MenuCategory";

const categories = require("../assets/categories.json").categories;

export default function MenuBreakdown({ setCategory }) {

    const renderItems = categories.map((category, index) =>
        (<MenuCategory key={index} category={category} setCategory={setCategory} />));

    return (
        <View style={styles.container}>
            <Text style={styles.title}>ORDER FOR DELIVERY!</Text>
            <ScrollView style={styles.itemsContainer} horizontal>
                {renderItems}
            </ScrollView>
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
        marginVertical: 10
    }
});