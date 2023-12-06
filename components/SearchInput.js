import { StyleSheet, TextInput, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

export default function SearchInput({ searchQuery, setSearchQuery}) {
    return (
        <View style={styles.searchInputContainer}>
            <Icon name="search" size={25} />
            <TextInput
                placeholder="Search"
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.searchInput} />
        </View>
    );
}

const styles = StyleSheet.create({
    searchInputContainer: {
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingLeft: 5,
        flexDirection: "row",
        alignItems: "center"
    },
    searchInput: {
        padding: 15,
        fontSize: 20
    }
});