import { Image, StyleSheet, Text, View } from "react-native";
import SearchInput from "./SearchInput";

import {
    restaurant_name,
    restaurant_location,
    restaurant_desc
} from "../constants";


export default function HeroSection({searchQuery, setSearchQuery}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{restaurant_name}</Text>
            <View style={styles.descContainer}>
                <View style={styles.descText}>
                    <Text style={styles.cityName}>{restaurant_location}</Text>
                    <Text style={styles.desc}>{restaurant_desc}</Text>
                </View>
                <Image style={styles.descImage} source={require("../assets/HeroImage.png")} />
            </View>

            <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
        backgroundColor: "#495E57"
    },
    title: {
        fontSize: 35,
        color: "#F4CE14",
        fontWeight: "bold"
    },
    descContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10
    },
    descText: {
        flex: 1
    },
    cityName: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold"
    },
    desc: {
        marginVertical: 10,
        color: "#fff"
    },
    descImage: {
        flex: 1,
        height: 150,
        marginVertical: 20,
        borderRadius: 20
    }
});