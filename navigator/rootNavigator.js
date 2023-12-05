import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Onboarding from '../screens/Onboarding';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../screens/Profile';
import SplashScreen from '../screens/Splash';
import useFetchUser from '../hooks/useFetchUser';
import { AppContext } from '../context/AppContext';
import Home from '../screens/Home';
import HomeHeader from '../components/HomeHeader';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    const { isOnBoardingComlete, setIsOnBoardingComlete } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);
    const { onBoardingStatus } = useFetchUser(setIsLoading);

    useEffect(() => {
        setIsOnBoardingComlete(onBoardingStatus);
    }, [onBoardingStatus])

    if (isLoading) {
        return <SplashScreen />;
    }

    return (
        <Stack.Navigator>
            {isOnBoardingComlete ? (
                <>
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{
                            header: () => <HomeHeader />
                        }} />
                    <Stack.Screen name="Profile" component={Profile} />
                </>
            ) : (
                <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
            )}
        </Stack.Navigator>
    );
}