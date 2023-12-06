import React, { useContext, useState } from "react";
import { View, Text, Image, TextInput, StyleSheet, Alert, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../context/AppContext";
import { isNotEmpty } from "../utils";

import {
    restaurant_name,
    restaurant_location,
    restaurant_desc
} from "../constants";


export default function Onboarding() {
    const [firstName, setFirstName] = useState("");
    const { setIsOnBoardingComlete } = useContext(AppContext);
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = function () {
        let inputsValid = isNotEmpty(firstName) && isNotEmpty(email);
        if (inputsValid) {
            setIsLoading(true);
            AsyncStorage.setItem("user", JSON.stringify({ "email": email, "firstName": firstName }))
                .then((value) => {
                    // navigation.reset();
                    setIsOnBoardingComlete(true);
                })
                .catch((err) => {
                    Alert.alert("Error", err.message);
                    setIsLoading(false);
                }).finally(() => {
                    setIsLoading(false);
                });
        }
    }

    return (
        <View style={styles.container}>
            {/* <Image style={styles.logo} source={require("../assets/Logo.png")} /> */}
            <View style={styles.heroContainer}><Text style={styles.rest_title}>{restaurant_name}</Text>
                <View style={styles.descContainer}>
                    <View style={styles.descText}>
                        <Text style={styles.cityName}>{restaurant_location}</Text>
                        <Text style={styles.desc}>{restaurant_desc}</Text>
                    </View>
                    <Image style={styles.descImage} source={require("../assets/HeroImage.png")} />
                </View></View>

            <View style={styles.formContainer}>
                <Text style={styles.title}>Let us get to know you</Text>
                <Text style={styles.inputLabel}>Name*</Text>
                <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} keyboardType="default" textContentType="name" autoFocus />
                <Text style={styles.inputLabel}>Email*</Text>
                <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" textContentType="emailAddress" />
            </View>
            <View style={styles.buttonContainer}>
                {isLoading ? <ActivityIndicator size="large" /> : <Button btnColor="primary" onPress={onSubmit}>Next</Button>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // paddingTop: 25,
        flex: 1,
        flexDirection: "column"
    },
    heroContainer: {
        padding: 25,
        backgroundColor: "#495E57"
    },
    logo: {
        alignSelf: "center",
        height: 50
    },
    formContainer: {
        // marginVertical: 25,
        // backgroundColor: "#9dbef2",
        padding: 25,
    },
    inputLabel: {
        fontSize: 20,
        // textAlign: "center"
        color: '#808080',
        fontWeight: "bold"
    },
    input: {
        borderColor: "#000",
        borderWidth: 1,
        marginVertical: 8,
        padding: 10,
        borderRadius: 8,
        fontSize: 18
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: 50
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingHorizontal: 25
    },
    rest_title: {
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