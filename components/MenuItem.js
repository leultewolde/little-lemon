import { Image, StyleSheet, Text, View } from "react-native";

export default function MenuItem({ item }) {
    const imageURI = `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`;
    return (
        <View style={styles.itemContainer}>
            <View style={styles.itemVert}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                <Text numberOfLines={2} style={styles.itemDesc}>{item.description}</Text>
                <Text style={styles.itemPrice}>${item.price}</Text>
            </View>
            <Image style={styles.itemImage} source={{ uri: imageURI }} />
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        gap: 5
    },
    itemVert: {
        flexDirection: "column",
        flex: 1
    },
    itemTitle: {
        fontSize: 20,
        fontWeight: "bold"
    },
    itemDesc: {
        fontSize: 18,
        color: "#6e6e6e",
        marginVertical: 10,
        flexShrink: 1
    },
    itemPrice: {
        fontSize: 20,
        color: "#6e6e6e",
        fontWeight: "bold"
    },
    itemImage: {
        width: 90,
        height: 90
    }
});