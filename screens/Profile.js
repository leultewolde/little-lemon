import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

import Button from "../components/Button";
import { MaskedTextInput } from "react-native-mask-text";


export default function Profile({navigation}) {
    const [isLoading, setIsLoading] = useState(false);

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: ""
    });

    const [notifications, setNotifications] = useState({
        orderStatuses: false,
        passwordChanges: false,
        specialOffers: false,
        newsletter: false,
    })

    const onChangeUser = (key) => {
        return (value) => {
            setUser({
                ...user,
                [key]: value
            })
        }
    }

    onChangeNotificationValue = (key) => {
        return () => {
            setNotifications({
                ...notifications,
                [key]: !notifications[key]
            })
        }
    }

    useEffect(() => {
        setIsLoading(true);
        AsyncStorage
            .getItem("user")
            .then((value) => {
                setUser({ ...JSON.parse(value) });
            })
            .catch((err) => {
                Alert.alert("Error", err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
                <Text>Loading Profile</Text>
            </View>
        );
    }

    const UserForm = () => {
        return (
            <>
                <Text style={styles.inputLabel}>First Name</Text>
                <TextInput
                    style={styles.input}
                    value={user.firstName}
                    onChangeText={onChangeUser("firstName")}
                    keyboardType="default"
                    textContentType="name"
                    placeholder="First Name" />

                <Text style={styles.inputLabel}>Last Name</Text>
                <TextInput
                    style={styles.input}
                    value={user.lastName}
                    onChangeText={onChangeUser("lastName")}
                    keyboardType="default"
                    textContentType="familyName"
                    placeholder="Last Name" />

                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={user.email}
                    onChangeText={onChangeUser("email")}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    placeholder="Email" />

                <Text style={styles.inputLabel}>Phone Number</Text>
                <MaskedTextInput
                    mask="999-999-9999"
                    value={user.phoneNumber}
                    keyboardType="phone-pad"
                    textContentType="telephoneNumber"
                    onChangeText={(text, rawText) => onChangeUser("phoneNumber")(rawText)}
                    style={styles.input}
                    placeholder="Phone Number" />
            </>
        )
    }

    const UserAvatar = () => {
        const [image, setImage] = useState(null);

        const pickImage = async () => {
            // No permissions request is necessary for launching the image library
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }
        };
        return (
            <>
                <Text style={styles.inputLabel}>Avatar</Text>
                <View style={styles.avatarContainer}>
                    <Image style={styles.avatar} source={image ? { uri: image } : require("../assets/Profile.png")} />
                    <View style={styles.btnsContainer}>
                        <Button btnColor="accent" onPress={pickImage}>Change</Button>
                        <View style={{ padding: 5 }} />
                        <Button btnColor="accent" btnType="outline" onPress={() => setImage(null)}>Remove</Button>
                    </View>
                </View>
            </>
        );
    }

    const EmailNotificationsCheckboxes = () => {

        function camelCaseToTitleCase(str) {
            let result = str.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1");
            return result.charAt(0).toUpperCase() + result.slice(1)
        }

        const checkboxes = () => {
            let checkboxes = [];
            for (key in notifications) {
                let checkbox = (
                    <View key={key} style={styles.section}>
                        <Checkbox
                            style={styles.checkbox}
                            value={notifications[key]}
                            onValueChange={onChangeNotificationValue(key)} />
                        <Text>{camelCaseToTitleCase(key)}</Text>
                    </View>
                );
                checkboxes.push(checkbox);
            }
            return checkboxes;
        }

        return (
            <>
                <Text style={styles.inputLabel}>Email Notifications</Text>
                {checkboxes()}
            </>
        );
    }

    const logout = () => {
        setIsLoading(true);
        AsyncStorage
            .removeItem("user")
            .then((_) => {
                navigation.navigate("Onboarding");
            })
            .catch((err) => {
                Alert.alert("Error", err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const saveChanges = function () {
        setIsLoading(true);
        AsyncStorage.setItem("user", JSON.stringify(user))
            .then((value) => {
                setUser({ ...JSON.parse(value) });
            })
            .catch((err) => {
                Alert.alert("Error", err.message);
                setIsLoading(false);
            }).finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <ScrollView style={styles.scollContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Personal Information</Text>
                <UserAvatar />
                <UserForm />
                <EmailNotificationsCheckboxes />

                <View style={{ padding: 15 }} />
                <Button btnColor="primary" onPress={logout}>Log Out</Button>
                <View style={{ padding: 15 }} />
                <View style={styles.btnsContainer}>
                    <Button btnColor="accent" btnType="outline">Discard changes</Button>
                    <Button btnColor="accent" onPress={saveChanges}>Save changes</Button>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center"
    },
    scollContainer: {
        flex: 1,
        backgroundColor: "#fff"
    },
    container: {
        flex: 1,
        padding: 12
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 10
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: "300"
    },
    input: {
        padding: 10,
        borderWidth: 1,
        fontSize: 19,
        marginBottom: 14,
        borderRadius: 8
    },
    avatarContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    btnsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        margin: 8,
    },
});
