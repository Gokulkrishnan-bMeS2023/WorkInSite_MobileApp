import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import OfflineScreen from './src/screens/OfflineScreen.tsx/OfflineScreen';

const App = () => {
  const [isConnected, setIsConnected] = useState<boolean>(true);
  useEffect(() => {
    // Subscribe to network state changes
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected ?? false);
    });
    // Cleanup subscription
    return () => unsubscribe();
  }, []);
  return (
    <View style={styles.container}>
      {isConnected ? (
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      ) : (
        <OfflineScreen />
      )}
    </View>
  );
};
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});``
