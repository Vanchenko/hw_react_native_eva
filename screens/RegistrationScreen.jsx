import { useState } from "react";
import { View,Text, TextInput, StyleSheet, Pressable, ImageBackground,
  KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/selectors";
import * as ImagePicker from "expo-image-picker";
import { ImageUser } from "../components/ImageUser/ImageUser";
import { auth, storage } from "../firebase/config";
import { logIn } from "../redux/authSlice";
import { updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
import { loginDB, loadAvatarToServer } from "../firebase/postsFirebaseOperation";
import BackImage from './image/PhotoBG.png';

const initialState = {
  photoURL: null,
  displayName: null,
  email: null,
  password: null,
};

const Registration = () => {
  const [state, setState] = useState(initialState);
  const [visiblePassword, useVisiblePassword] = useState(true);
  const [focused, setFocused] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // const authState = useSelector(selectUser);
  
//console.log('Local state',state);
//console.log("authState in RegistrationScreen", authState);

  const onCheckRegistration = async () => {
    const { displayName, email, password, photoURL } = state;
    if (displayName && email && password && photoURL) {
      const test = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const { uid } = await loginDB({
        email,
        password,
      });
      const storageAvatar = await loadAvatarToServer(photoURL, uid);
      await setState((prev) => ({ ...prev, photoURL:storageAvatar }));
      await updateProfile(auth.currentUser, {
        displayName: displayName,
        photoURL: storageAvatar,
      });
     // console.log("state", email, displayName, uid, photoURL);
      dispatch(logIn({ email, displayName, uid, photoURL }));
      setState(initialState);
      navigation.navigate("Home");
    }
  };
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, quality: 1 });
   // console.log("registration result", result.assets[0].uri);
    if (!result.canceled) {
       const photoURL = result.assets[0].uri;
       setState((prev) => ({ ...prev, photoURL }));
     } else {
       alert("You did not select any image.");
     }
  };

return (
  <ImageBackground source={BackImage} style={styles.image}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{ flex: 1, justifyContent: "flex-end", zIndex: 10 }}
      >
        <View style={styles.container}>
          <ImageUser
            state={state}
            onPress={pickImageAsync}
            onDelete={setState}
          />
          <Text style={styles.title}>Реєстрація</Text>
          <TextInput
            style={
              focused === "name"
                ? { ...styles.input, ...styles.focusedInput }
                : { ...styles.input }
            }
            placeholder="Логін"
            editable
            numberOfLines={1}
            maxLength={40}
            onChangeText={(value) =>
              setState((prev) => ({ ...prev, displayName: value }))
            }
            value={state.displayName}
            onFocus={() => setFocused("name")}
            onBlur={() => setFocused(null)}
          />
          <TextInput
            style={
              focused === "email"
                ? { ...styles.input, ...styles.focusedInput }
                : { ...styles.input }
            }
            placeholder="Адреса електронної пошти"
            editable
            numberOfLines={1}
            maxLength={40}
            onChangeText={(value) =>
              setState((prev) => ({ ...prev, email: value }))
            }
            value={state.email}
            onFocus={() => setFocused("email")}
            onBlur={() => setFocused(null)}
          />
          <View>
            <TextInput
              style={
                focused === "password"
                  ? { ...styles.input, ...styles.focusedInput }
                  : { ...styles.input }
              }
              placeholder="Пароль"
              autoComlete="password"
              secureTextEntry={visiblePassword}
              editable
              numberOfLines={1}
              maxLength={40}
              onChangeText={(value) =>
                setState((prev) => ({ ...prev, password: value }))
              }
              value={state.password}
              onFocus={() => setFocused("password")}
              onBlur={() => setFocused(null)}
            />
            {state.password && (
              <Pressable
                style={styles.switch}
                onPress={() => useVisiblePassword(!visiblePassword)}
              >
                <Text>{visiblePassword ? "Показати" : "Сховати"}</Text>
              </Pressable>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
    <View style={styles.buttonsWrapper}>
      <Pressable
        style={styles.buttonNewRegistration}
        onPress={onCheckRegistration}
      >
        <Text style={styles.textBtnLogin}>Зареєструватися</Text>
      </Pressable>
      <Pressable
        style={styles.buttonAlreadyLogin}
        onPress={() => navigation.navigate("Login")}
      >
        <Text>Вже є аккаунт? Увійти</Text>
      </Pressable>
    </View>
  </ImageBackground>
);
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 92,
    paddingHorizontal: 16,
    paddingBottom: 45,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFFFFF",
  },
  image: {
    position: "relative",
    flex: 1,
  },
  avatar: {
    alignSelf: "center",
    marginTop: -60,
    position: "absolute",
  },
  pressAvatarAdd: {
    position: "absolute",
    marginTop: 21,
    marginLeft: 247,
  },
  title: {
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    paddingBottom: 32,
    justifyContent: "center",
  },
  input: {
    marginBottom: 16,
    paddingLeft: 16,
    height: 50,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#E8E8E8",
  },
  focusedInput: {
    borderColor: "#FF6C00",
    borderWidth: 2,
  },
  switch: {
    position: "absolute",
    right: 16,
    top: 10,
  },
  buttonsWrapper: {
    backgroundColor: "#FFFFFF",
    paddingBottom: 32,
    paddingHorizontal: 16,
  },
  buttonNewRegistration: {
    marginTop: 27,
    height: 51,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    borderRadius: 100,
  },
  textBtnLogin: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    alignSelf: "center",
    justifyContent: "center",
    color: "#FFFFFF",
  },
  buttonAlreadyLogin: {
    marginTop: 16,
    alignItems: "center",
  },
});
export default Registration;
