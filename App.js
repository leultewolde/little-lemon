import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigator/rootNavigator';
import { AppContextProvider } from './context/AppContext';

export default function App() {

  return (
    <AppContextProvider>
      <>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
        <StatusBar style="auto" />
      </>
    </AppContextProvider>
  );
}