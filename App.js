import 'react-native-gesture-handler';
import { StyleSheet, Button, View, ImageBackground } from 'react-native';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from 'expo-font';
import Registration from './screens/RegistrationScreen.jsx';
import Login from './screens/LoginScreen.jsx';
import Home from './screens/Home.jsx'
import Comments from './screens/CommentsScreen.jsx';
import CreatePostsScreen from './screens/CreatePostsScreen.jsx';
import Map from './screens/MapScreen.jsx';


const MainStack = createStackNavigator(); // вказує на групу навігаторів

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Login" screenOptions={{
          headerShown:false,
        }}>
        <MainStack.Screen name="Registration" component={Registration} />
        <MainStack.Screen name="Login" component={Login} 
        />
        <MainStack.Screen name="Home" component={Home} />
        <MainStack.Screen name="Comments" component={Comments} />
        <MainStack.Screen name="createPostsScreen" component={CreatePostsScreen} />
        <MainStack.Screen name="Map" component={Map} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

