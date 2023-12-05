import React, { useContext, useState } from "react";
import { View, Text, Image, TextInput, StyleSheet, Alert, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../context/AppContext";
import { isNotEmpty } from "../utils";


export default function Onboarding() {
    const navigation = useNavigation();

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
            <Image style={styles.logo} source={require("../assets/Logo.png")} />
            <View style={styles.formContainer}>
                <Text style={styles.title}>Let us get to know you</Text>
                <Text style={styles.inputLabel}>First Name</Text>
                <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} keyboardType="default" textContentType="name" autoFocus />
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" textContentType="emailAddress" />
            </View>
            <View style={styles.buttonContainer}>
                {isLoading ? <ActivityIndicator size="large" /> : <Button onPress={onSubmit}>Next</Button>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 25,
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#d5e1f5"
    },
    logo: {
        alignSelf: "center",
        height: 50
    },
    formContainer: {
        marginVertical: 25,
        backgroundColor: "#9dbef2",
        padding: 25,
    },
    inputLabel: {
        fontSize: 20,
        textAlign: "center"
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
    }
});