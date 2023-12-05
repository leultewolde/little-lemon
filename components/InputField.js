import { StyleSheet, Text, TextInput } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";

import { camelCaseToTitleCase } from "../utils";


const FieldType = {
    default: {
        keyboardType: "default",
        textContentType: "default"
    },
    firstName: {
        keyboardType: "default",
        textContentType: "name"
    },
    lastName: {
        keyboardType: "default",
        textContentType: "familyName"
    },
    email: {
        keyboardType: "email-address",
        textContentType: "emailAddress"
    },
    phoneNumber: {
        keyboardType: "phone-pad",
        textContentType: "telephoneNumber"
    }
}

const InputField = function ({ value, setValue, type = "default", mask = null }) {

    let field = FieldType[type];

    const props = {
        style: styles.input,
        value: value,
        keyboardType: field["keyboardType"],
        textContentType: field["textContentType"],
        placeholder: type === "default" ? null : camelCaseToTitleCase(type)
    }

    const changeText = (text) => {
        setValue(text);
    }

    return (
        <>
            <Text style={styles.inputLabel}>{type === "default" ? "Input" : camelCaseToTitleCase(type)}</Text>
            {mask ? (
                <MaskedTextInput
                    {...props}
                    mask={mask}
                    onChangeText={(_, rawText) => changeText(rawText)} />
            ) : (
                <TextInput
                    {...props}
                    onChangeText={changeText} />
            )}
        </>
    );
}

const styles = StyleSheet.create({
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
    }
});

export default InputField;