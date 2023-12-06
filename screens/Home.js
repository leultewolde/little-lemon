import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import HeroSection from "../components/HeroSection";
import MenuBreakdown from "../components/MenuBreakdown";
import MenuItems from "../components/MenuItems";


export default function Home() {

    const [category, setCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <ScrollView style={styles.scollContainer}>
            <>
                <HeroSection searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
                <MenuBreakdown setCategory={setCategory} />
                <MenuItems category={category} searchQuery={searchQuery} />
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
