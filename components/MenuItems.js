import { useState } from "react";
import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator } from "react-native";
import useFetchMenuItems from "../hooks/useFetchMenuItems";

export default function MenuItem() {
    const [isLoading, setIsLoading] = useState(false);

    const { menuItems } = useFetchMenuItems(setIsLoading);

    const Item = ({ item }) => {

        return (
            <View style={styles.itemContainer}>
                <View style={styles.itemVert}>
                    <Text style={styles.itemTitle}>{item.name}</Text>
                    <Text numberOfLines={2} style={styles.itemDesc}>{item.description}</Text>
                    <Text style={styles.itemPrice}>${item.price}</Text>
                </View>
                <Image style={styles.itemImage} source={{ uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true` }} />
            </View>
        );
    }

    const renderItems = () => {
        return (
            <View style={styles.itemsContainer}>
                {menuItems.map((item, index) => (
                    <Item key={index} item={item} />
                ))}
            </View>
        );
    }

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
                <Text>Loading Profile</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {renderItems()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 25
    },
    itemsContainer: {
        flexDirection: "column"
    },
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