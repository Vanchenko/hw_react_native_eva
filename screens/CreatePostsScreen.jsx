import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Map from './MapScreen.jsx'

const CreatePost = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Create post!</Text>
      {/* <Map /> */}
    </View>
  );
};

export default CreatePost;
