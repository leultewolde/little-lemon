import { useNavigation } from "@react-navigation/native";
import { Image, TouchableOpacity, StyleSheet, Text, View } from "react-native";


export default function HomeHeader() {
    const navigation = useNavigation();

    const goToProfile = () => {
        navigation.navigate("Profile");
    }

    return (
        <View style={styles.container}>
            <View></View>
            <Image source={require("../assets/Logo.png")} />
            <TouchableOpacity style={styles.avatarBtn} onPress={goToProfile}>
                <Image style={styles.avatar} source={require("../assets/Profile.png")} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 35,
        paddingBottom: 15,
        paddingHorizontal: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    avatarBtn: {
        alignSelf: "flex-end"
    },
    avatar: {
        width: 50,
        height: 50
    }
});