import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, Pressable } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import photoPost1 from "./image/image-post-1.png";

const Map = ({ route: { params } }) => {
  const navigation = useNavigation();
  const {
    photo,
    namePost,
    latitude,
    longitude,
    } = params;
 // console.log(namePost);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            style={styles.pressLogoff}
            onPress={() => navigation.navigate("Post")}
          >
            <AntDesign name="arrowleft" size={22} color="black" />
          </Pressable>
          <Text style={styles.title}>Мапа</Text>
        </View>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          mapType="standard"
          minZoomLevel={15}
        >
          <Marker
            title={namePost}
            coordinate={{ latitude: latitude, longitude: longitude }}
          >
            <Image
              source={photoPost1}
              style={{ width: 50, height: 50, borderRadius: 8 }}
            />
          </Marker>
        </MapView>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    marginTop: 44,
    paddingBottom: 11,
    justifyContent: "flex-start",
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
  },
  title: {
    backgroundColor: "#FFFFFF",
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    paddingBottom: 5,
    marginLeft: 120,
  },
  pressLogoff: {
    alignSelf: "center",
    marginLeft: 12,
    paddingRight: 10,
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default Map;