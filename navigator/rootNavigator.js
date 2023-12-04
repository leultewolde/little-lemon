import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Onboarding from '../screens/Onboarding';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../screens/Profile';
import SplashScreen from '../screens/Splash';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    const [isLoading, setIsLoading] = useState(false);
    const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        AsyncStorage
            .getItem("user")
            .then((value) => {
                setIsOnboardingCompleted(value !== null);
            })
            .catch((err) => {
                setIsOnboardingCompleted(false);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <SplashScreen />;
    }

    return (
        <Stack.Navigator initialRouteName={isOnboardingCompleted ? "Profile" : "Onboarding"}>
            <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fff"
    },
});
