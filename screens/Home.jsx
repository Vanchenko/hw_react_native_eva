// Home.js

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Post from './PostsScreen.jsx';
import { Ionicons, AntDesign } from "@expo/vector-icons";

function Settings() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile!</Text>
    </View>
  );
}

const Tabs = createBottomTabNavigator();

const Home = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        labeled: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Post") {
            iconName = focused ? "appstore-o" : "appstore1";
          } else if (route.name === "CreatePost") {
            iconName = focused ? "pluscircleo" : "pluscircle";
          } else if (route.name === 'Profile') {
            iconName = focused ? 'user' : 'user';
          }
          return <AntDesign name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tabs.Screen name="Post" component={Post} options={{tarBarLabel: 'false'}}/>
      <Tabs.Screen name="CreatePost" component={Settings} />
      <Tabs.Screen name="Profile" component={Profile} />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
