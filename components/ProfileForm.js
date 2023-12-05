import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import InputField from "../components/InputField";
import useFetchUser from "../hooks/useFetchUser";
import EmailNotificationsCheckboxes from "./EmailNotificationsCheckboxes";
import Button from "./Button";
import { AppContext } from "../context/AppContext";

const ProfileForm = () => {
    const { setIsOnBoardingComlete } = useContext(AppContext);
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const {user, setUser, userValueValid, submitChanges, clearData} = useFetchUser(setIsLoading);


    const onChangeUser = (key) => {
        return (value) => {
            setUser({
                ...user,
                [key]: value
            })
        }
    }

    const onChangeEmailNotifs = (key) => {
        return () => {
            setUser({
                ...user,
                emailNotifications: {
                    ...user.emailNotifications,
                    [key]: !user.emailNotifications[key]
                }
            })
        }
    }

    const isNotEmpty = (val) => val !== null && val !== undefined && val !== "";

    const inputsValid = isNotEmpty(user.firstName)
        && isNotEmpty(user.lastName)
        && isNotEmpty(user.email)
        && isNotEmpty(user.phoneNumber);

    const saveChanges = function () {
        if (inputsValid) {
            submitChanges((value) => {
            }, (err) => {
                Alert.alert("Error", err.message)
            });
        }
    }

    const logout = () => {
        clearData(() => {
            // nav.replace("Onboarding");
            // navigation.reset();
            setIsOnBoardingComlete(false);
        }, (err) => {
            Alert.alert("Error", err.message);
        });
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
        <>
            <InputField
                value={user.firstName}
                setValue={onChangeUser("firstName")}
                type="firstName" />
            <InputField
                value={user.lastName}
                setValue={onChangeUser("lastName")}
                type="lastName" />
            <InputField
                value={user.email}
                setValue={onChangeUser("email")}
                type="email" />
            <InputField
                mask="999-999-9999"
                value={user.phoneNumber}
                setValue={onChangeUser("phoneNumber")}
                type="phoneNumber" />

            <EmailNotificationsCheckboxes
                emailNotifications={user.emailNotifications}
                onChangeEmailNotifs={onChangeEmailNotifs} />

            <View style={styles.boxPadding} />
            <Button btnColor="primary" onPress={logout}>Log Out</Button>
            <View style={styles.boxPadding} />
            <View style={styles.btnsContainer}>
                <Button btnColor="accent" btnType="outline">Discard changes</Button>
                <Button btnColor="accent" onPress={saveChanges} disabled={!inputsValid} >Save changes</Button>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    boxPadding: { padding: 15 },
    loadingContainer: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center"
    },
    btnsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly"
    }
});

export default ProfileForm;