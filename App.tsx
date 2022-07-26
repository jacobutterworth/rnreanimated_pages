import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import BallDrag from './src/screens/BallDrag';
import Box from './src/screens/Box';
import FidgetBox from './src/screens/FidgetBox';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Ball"
          component={BallDrag}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Box"
          component={Box}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FidgetBox"
          component={FidgetBox}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
