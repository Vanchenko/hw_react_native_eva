// Home.js

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Post from './PostsScreen.jsx';
import CreatePost from './CreatePostsScreen.jsx';
import Profile from './ProfileScreen.jsx';
import { Ionicons, AntDesign } from "@expo/vector-icons";

const Tabs = createBottomTabNavigator();

const Home = () => {
  return (
    <Tabs.Navigator
      labeled={false}
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        // tabBarStyle: [ {"display": "flex"}, null ],
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Post") {
            iconName = focused ? "appstore-o" : "appstore1";
          } else if (route.name === "CreatePost") {
            iconName = focused ? "pluscircleo" : "pluscircle";
          } else if (route.name === "Profile") {
            iconName = focused ? "user" : "user";
          }
          return <AntDesign name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="Post" component={Post} />
      <Tabs.Screen
        name="CreatePost"
        component={CreatePost}
        options={{ tabBarStyle: { display: "none" } }}
      />
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
