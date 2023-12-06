import { useNavigation } from "@react-navigation/native";
import { Image, TouchableOpacity, StyleSheet, Text, View } from "react-native";


export default function OnBoardingHeader() {
    const navigation = useNavigation();

    const goToProfile = () => {
        navigation.navigate("Profile");
    }

    return (
        <View style={styles.container}>
            <View></View>
            <Image source={require("../assets/Logo.png")} />
            <View></View>
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
    }
});