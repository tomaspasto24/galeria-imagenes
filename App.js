import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from './screens/HomeScreen';
import ImageScreen from './screens/ImageScreen';
import { useState } from 'react';

const Stack = createNativeStackNavigator()

export default function App() {

  const [openSearch, setOpenSearch] = useState(false)

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='HomeScreen'
          // component={HomeScreen}
          options={{
            headerLeft: () => <Image source={require('./assets/pexels.png')} style={styles.logo} />,
            headerRight: () => <Text style={{ color: 'white', fontSize: 18 }} onPress={() => setOpenSearch(!openSearch)}>{openSearch ? "Close" : "Search"}</Text>,
            headerStyle: {
              backgroundColor: '#0D0D0D'
            },
            headerTitleStyle: {
              fontWeight: 'bold'
            },
            headerTintColor: '#fff',
            title: 'Pexels App'
          }}
        >
          {(props) => <HomeScreen {...props} openSearch={openSearch} />}
        </Stack.Screen>

        <Stack.Screen
          name='ImageScreen'
          component={ImageScreen}
          options={{
            headerStyle: {
              backgroundColor: '#0D0D0D'
            },
            headerTitleStyle: {
              fontWeight: 'bold'
            },
            headerTintColor: '#fff',
            title: 'Pexels App'
          }}
        />
      </Stack.Navigator>
      {/* <StatusBar /> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 37,
    height: 37,
    marginEnd: 10,
    borderRadius: 5
  }
})