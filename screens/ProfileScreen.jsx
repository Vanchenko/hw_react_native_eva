import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ImageBackground,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/selectors";
import * as ImagePicker from "expo-image-picker";
import { ImageUser } from "../components/ImageUser/ImageUser";
import { onSnapshot, query, where } from "firebase/firestore";
import { postsCollectionRef, loadAvatarToServer } from "../firebase/postsFirebaseOperation";
import { auth } from "../firebase/config";
import { updateProfile } from "firebase/auth";
import { logOut, updateUserAvatar } from "../redux/authSlice";
import BackImage from "./image/PhotoBG.png";

const Profile = () => {
  const [post, setPost] = useState([]);
  const authState = useSelector(selectUser);
  const navigation = useNavigation();
  const [state, setState] = useState(authState);
  const dispatch = useDispatch();

 // console.log('authState in Profile - ', authState.uid)
  useEffect(() => {
    const q = query(postsCollectionRef, where("uid", "==", authState.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newData = [];
      snapshot.forEach((doc) => newData.push({ ...doc.data(), id:doc.id}));
      setPost(newData);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      const photoURL = await loadAvatarToServer(
        result.assets[0].uri,
        authState.uid
      );
      await setState((prev) => ({ ...prev, photoURL }));
      await updateProfile(auth.currentUser, {
        photoURL: photoURL,
      });
      dispatch(updateUserAvatar( photoURL ));
    } else {
      alert("You did not select any image.");
    }
  };

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
    <ImageBackground source={BackImage} style={styles.image}>
      <View style={styles.container}>
        <View style={styles.wrapperHeader}>
          <ImageUser
            state={state}
            onPress={pickImageAsync}
            onDelete={setState}
          />
          <Pressable style={styles.pressLogoff} onPress={userLogOut}>
            <Image source={require("./image/log-out.png")} />
          </Pressable>
          <Text style={styles.title}>{authState.displayName}</Text>
        </View>
        <FlatList
         style={styles.headerFlatlist}
          data={post}
          ListEmptyComponent={
            <View style={styles.wrapperMessage}>
              <Text style={styles.wrapperMessageText}>
                You don't have any posts yet...
              </Text>
            </View>
          }
          renderItem={({
            item: {
              id,
              photo,
              namePost,
              location: { latitude, longitude },
              convertedCoordinate: { region, country },
              commentsCount,
              photoFilename,
              uid,
            },
          }) => {
            return (
              <View style={styles.subContainer} key={id}>
                <Pressable
                  style={styles.imageContainer}
                  onPress={() =>
                    navigation.navigate("EditPostScreen", {
                      photo,
                      namePost,
                      location: { latitude, longitude },
                      convertedCoordinate: { region, country },
                      photoFilename,
                      id,
                      uid,
                    })
                  }
                >
                  <Image source={{ uri: photo }} style={styles.imagePost} />
                </Pressable>
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 192,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 600,
    backgroundColor: "#FFFFFF",
  },
  image: {
    position: "relative",
    flex: 1,
  },
  wrapperHeader: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFFFFF",
  },
  headerFlatlist: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFFFFF",
  },
  wrapperMessage: {
    height: 450,
    marginTop: 30,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    alignItem: "center",
  },
  wrapperMessageText: {
    alignSelf: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 26,
    paddingBottom: 12,
    justifyContent: "center",
  },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 16,
    alignSelf: "center",
    marginTop: -60,
  },
  pressAvatarAdd: {
    position: "absolute",
    marginTop: 21,
    marginLeft: 247,
  },
  pressLogoff: {
    alignSelf: "center",
    top: 15,
    right: 25,
    paddingRight: 0,
    position: "absolute",
  },
  title: {
    marginTop: 62,
    alignSelf: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    paddingBottom: 8,
    justifyContent: "center",
  },
  postStyle: {
    alignSelf: "center",
    marginTop: 15,
  },
  subContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: "#FFFFFF",
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

export default Profile;
