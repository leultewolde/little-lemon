import React, {  } from "react";
import { View, Text, StyleSheet } from "react-native";
import Checkbox from 'expo-checkbox';

import { camelCaseToTitleCase } from "../utils";

const EmailNotificationsCheckboxes = ({emailNotifications, onChangeEmailNotifs}) => {

    const checkboxes = () => {
        let checkboxes = [];
        for (key in emailNotifications) {
            let checkbox = (
                <View key={key} style={styles.section}>
                    <Checkbox
                        style={styles.checkbox}
                        value={emailNotifications[key]}
                        onValueChange={onChangeEmailNotifs(key)} />
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

const styles = StyleSheet.create({
    inputLabel: {
        fontSize: 16,
        fontWeight: "300"
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        margin: 8,
    },
});

export default EmailNotificationsCheckboxes;