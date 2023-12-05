import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";


function Button({ children, onPress, btnColor = "default", btnType = "none", disabled=false }) {

    let bgColor = btnColor === "primary" ? "#F4CE14" : btnColor === "default" ? "#9dbef2" : "#495E57";

    let borderColor = bgColor;
    let borderWidth = btnType === "outline" ? 1 : 0;
    let textColor = btnColor === "primary" ? "#000" : "#fff";
    textColor = btnType === "outline" ? bgColor : textColor;

    bgColor = btnType === "outline" ? "#fff" : bgColor;
    bgColor = disabled ? "#4f4f4f" : bgColor;


    return (
        <Pressable style={[styles.container, { backgroundColor: bgColor, borderColor: borderColor, borderWidth: borderWidth }]} onPress={onPress} disabled={disabled} di>
            <Text style={[styles.text, { color: textColor }]}>{children}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 8,
    },
    text: {
        fontSize: 20,
        textAlign: "center"
    }
});

export default Button;