import React from 'react';
import {View,Text, StyleSheet, Button, Alert, Pressable, Image, FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import photoPost1 from './image/image-post-1.png';

const Post = () => {
  const navigation = useNavigation();
  const post = [
    {
      id: 1,
      photo: "./image/image-post-1.png",
      namePost: "Office",
      latitude: 48.5324538,
      longitude: 34.998182,
      convertedCoordinate: { region: "Dnipro", country: "Ukraine" },
      commentsCount: 5,
    },
  ];

 // console.log(post);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Публікації</Text>
        <Pressable
          style={styles.pressLogoff}
          onPress={() => navigation.navigate("Login")}
        >
          <Image source={require("./image/log-out.png")} />
        </Pressable>
      </View>
      <View style={styles.wrapper}>
        <Image source={require("./image/ava-romanova.png")} />
        <View style={styles.wrapperUserInfo}>
          <Text style={styles.name}>Natali Romanchuk</Text>
          <Text style={styles.email}>email@gmail.com</Text>
        </View>
      </View>
      <FlatList
        data={post}
        renderItem={({
          item: {
            id,
            photo,
            namePost,
            latitude,
            longitude,
            convertedCoordinate: { region, country },
            commentsCount,
          },
        }) => {
          return (
            <View style={styles.subContainer}>
              <View style={styles.imageContainer}>
                <Image source={photoPost1} style={styles.image} />
              </View>
              <Text style={[{ ...styles.text, ...styles.namePost }]}>
                {namePost}
              </Text>
              <View style={styles.infoThumb}>
                <Pressable
                  style={styles.info}
                  onPress={() => navigation.navigate("Comments")}
                >
                  <Feather
                    name="message-circle"
                    size={24}
                    color="#BDBDBD"
                    style={[
                      { transform: [{ rotate: "-90deg" }] },
                      commentsCount
                        ? { color: "#FF6C00" }
                        : { color: "#BDBDBD" },
                    ]}
                  />
                  <Text
                    style={[
                      styles.textComment,
                      commentsCount
                        ? { color: "#212121" }
                        : { color: "#BDBDBD" },
                    ]}
                  >
                    {commentsCount}
                  </Text>
                </Pressable>
                <Pressable
                  style={styles.info}
                  onPress={() => {
                    navigation.navigate("Map", {
                      photo,
                      namePost,
                      latitude,
                      longitude,
                    });
                  }}
                >
                  <Feather name="map-pin" size={24} color="#BDBDBD" />
                  <Text
                    style={[{ ...styles.text, ...styles.locationText }]}
                  >{`${region}, ${country}`}</Text>
                </Pressable>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    marginTop: 44,
    paddingBottom: 11,
    justifyContent: "flex-end",
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
  },
  title: {
    backgroundColor: "#FFFFFF",
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    paddingBottom: 5,
    // alignSelf: 'center',
    // justifyContent: 'center',
  },
  pressLogoff: {
    alignSelf: "center",
    marginLeft: 120,
    paddingRight: 10,
  },
  wrapper: {
    flexDirection: "row",
    marginTop: 32,
    paddingLeft: 16,
    alignItems: "center",
  },
  wrapperUserInfo: {
    flexDirection: "column",
    paddingLeft: 8,
  },
  name: {
    fontWeight: 700,
    fontSize: 13,
  },
  email: {
    fontWeight: 400,
    fontSize: 11,
  },
  postStyle: {
    alignSelf: "center",
    marginTop: 15,
  },
  subContainer: {
    paddingHorizontal: 16,
    marginBottom: 32,
    marginTop: 10,
   // alignItems: "center",
  },
  imageContainer: {},
  image: {
    height: 240,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    color: "#212121",
  },
  namePost: {
    marginVertical: 8,
    fontFamily: "Roboto-Medium",
  },
  infoThumb: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  info: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  textComment: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#BDBDBD",
  },
  locationText: {
    fontFamily: "Roboto-Regular",
    textDecorationLine: "underline",
  },
});
export default Post;