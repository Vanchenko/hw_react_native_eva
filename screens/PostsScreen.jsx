import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  FlatList,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/selectors";
import { Feather } from "@expo/vector-icons";
import { postsCollectionRef } from "../firebase/postsFirebaseOperation";
import { onSnapshot, query, orderBy } from "firebase/firestore";
import { auth } from "../firebase/config";
import { logOut } from "../redux/authSlice";

const Post = () => {
  const [post, setPost] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const authState = useSelector(selectUser);

 // console.log('authState', authState);
 
  useEffect(() => {
  const q = query(postsCollectionRef, orderBy("createdatetime","desc"));
   const unsubscribe = onSnapshot(q, (snapshot) => {
     const newData = snapshot.docs.map((doc) => ({
       ...doc.data(),
       id: doc.id,
     }));
     //console.log('newdata - ', newData);
     setPost(newData);
   });
   return () => {
     unsubscribe();
   };
 }, []);
  
  const userLogOut = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(logOut());
        navigation.navigate("Login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Публікації</Text>
        <Pressable
          style={styles.pressLogoff}
          onPress={userLogOut}
        >
          <Image source={require("./image/log-out.png")} />
        </Pressable>
      </View>
      <View style={styles.wrapper}>
        <Image
          source={{ uri: authState.photoURL }}
          style={styles.imageAvatar}
        />
        <View style={styles.wrapperUserInfo}>
          <Text style={styles.name}>{authState.displayName}</Text>
          <Text style={styles.email}>{authState.email}</Text>
        </View>
      </View>
      <FlatList
        data={post}
        renderItem={({
          item: {
            id,
            photo,
            namePost,
            location: { latitude, longitude },
            convertedCoordinate: { region, country },
            commentsCount,
            uid,
          },
        }) => {
          return (
            <View style={styles.subContainer} key={id}>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: photo }}
                  style={styles.imagePost}
                />
              </View>
              <Text style={[{ ...styles.text, ...styles.namePost }]}>
                {namePost}
              </Text>
              <View style={styles.infoThumb}>
                <Pressable
                  style={styles.info}
                  onPress={() =>
                    navigation.navigate("Comments", {
                      photo,
                      namePost,
                      id,
                      uid,
                    })
                  }
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
  imageAvatar: {
    height: 60,
    width: 60,
    borderRadius: 16,
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
  },
  imagePost: {
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
