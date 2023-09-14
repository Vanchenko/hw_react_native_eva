import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import Registration from './screens/RegistrationScreen.jsx';
import Login from './screens/LoginScreen.jsx';
import Home from './screens/Home.jsx'
import Comments from './screens/CommentsScreen.jsx';
import CreatePostsScreen from './screens/CreatePostsScreen.jsx';
import Map from './screens/MapScreen.jsx';
import EditPostScreen from './screens/EditPostScreen.jsx'


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
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
        <NavigationContainer>
          <MainStack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
            <MainStack.Screen name="Registration" component={Registration} />
            <MainStack.Screen name="Login" component={Login}/>
            <MainStack.Screen name="Home" component={Home} />
            <MainStack.Screen name="Comments" component={Comments} />
            <MainStack.Screen name="CreatePostsScreen" component={CreatePostsScreen} />
            <MainStack.Screen name="Map" component={Map} />
            <MainStack.Screen name="EditPostScreen" component={EditPostScreen} />
          </MainStack.Navigator>
        </NavigationContainer>
      {/* </PersistGate>  */}
    </Provider>
  );
}

