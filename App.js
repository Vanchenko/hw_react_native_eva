import 'react-native-gesture-handler';
import { StyleSheet, Button, View, ImageBackground } from 'react-native';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Registration from './screens/RegistrationScreen.jsx';
import Login from './screens/LoginScreen.jsx';
import Post from './screens/PostsScreen.jsx';

const MainStack = createStackNavigator(); // вказує на групу навігаторів

export default function App() {
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Login" screenOptions={{
          headerShown:false,
        }}>
        <MainStack.Screen name="Registration" component={Registration} />
        <MainStack.Screen name="Login" component={Login} 
        />
        <MainStack.Screen name="Post" component={Post} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

