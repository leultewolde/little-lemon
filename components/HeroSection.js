import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';


export default function HeroSection() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Little Lemon</Text>
            <View style={styles.descContainer}>
                <View style={styles.descText}>
                    <Text style={styles.cityName}>Chicago</Text>
                    <Text style={styles.desc}>
                        We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
                    </Text>
                </View>
                <Image style={styles.descImage} source={require("../assets/HeroImage.png")} />
            </View>
            <View style={styles.searchInputContainer}>
                <Icon name="search" size={25} />
                <TextInput
                    placeholder="Search"
                    style={styles.searchInput} />
            </View>
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
    },
    searchInputContainer: {
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingLeft: 5,
        flexDirection: "row",
        alignItems: "center"
    },
    searchInput: {
        padding: 10,
        fontSize: 20
    }
});