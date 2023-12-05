import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import HeroSection from "../components/HeroSection";
import MenuBreakdown from "../components/MenuBreakdown";
import MenuItem from "../components/MenuItems";


export default function Home() {
    return (
        <ScrollView style={styles.scollContainer}>
            <>
                <HeroSection />
                <MenuBreakdown />
                <MenuItem />
            </>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scollContainer: {
        flex: 1,
        backgroundColor: "#fff"
    }
});
