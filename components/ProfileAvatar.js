import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import * as ImagePicker from 'expo-image-picker';

import Button from "../components/Button";

const ProfileAvatar = () => {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
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

const styles = StyleSheet.create({
    inputLabel: {
        fontSize: 16,
        fontWeight: "300"
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
    }
});


export default ProfileAvatar;