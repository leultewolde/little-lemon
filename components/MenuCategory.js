import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function MenuCategory({ category, setCategory }) {

    const onPress = function () {
        setCategory(category.toLowerCase());
    }

    return (
        <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
            <Text style={styles.itemText}>{category}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: "#fff",
        elevation: 0.7,
        marginEnd: 10,
        padding: 5,
        borderRadius: 10
    },
    itemText: {
        fontSize: 18,
        color: "#495E57",
        fontWeight: "bold"
    }
});