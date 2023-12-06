import { useState } from "react";
import { StyleSheet, View } from "react-native";
import {useGetMenuItems} from "../hooks/useFetchMenuItems";
import Loading from "./Loading";
import MenuItem from "./MenuItem";

export default function MenuItems({category, searchQuery}) {
    const [isLoading, setIsLoading] = useState(false);

    const { menuItems } = useGetMenuItems(category, searchQuery, setIsLoading);

    const renderItems = menuItems.map((item, index) => (
        <MenuItem key={index} item={item} />
    ));

    if (isLoading) {
        return <Loading />;
    }

    return <View style={styles.container}>{renderItems}</View>;
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 25,
        paddingVertical: 10
    }
});