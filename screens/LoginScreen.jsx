import { useState } from 'react';
import {View,Text, TextInput, StyleSheet, Button, 
 Pressable, Alert, ImageBackground, KeyboardAvoidingView,
 Platform, Keyboard, TouchableWithoutFeedback} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from "react-redux";
import { logIn } from "../redux/authSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import BackImage from './image/PhotoBG.png';

const initialState = {
  email: '',
  password: '',
};

const Login = () => {
  const [state, setState] = useState(initialState);
  const [visiblePassword, useVisiblePassword] = useState(true);
  const [focused, setFocused] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const loginDB = async ({ email, password }) => {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      return credentials.user;
    } catch (error) {
      throw error;
    }
  };
  const onCheckLogin = async() => {
    const { email, password } = state;
    if (email && password) {
      const { emailCr, displayName, uid, photoURL } = await loginDB({
        email,
        password,
      });
      dispatch(logIn({ email, displayName, uid, photoURL }));
      navigation.navigate("Home");
    }
  }

  return (
    <ImageBackground source={BackImage} style={styles.image}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          //keyboardVerticalOffset={-50}
          style={{ flex: 1, justifyContent: "flex-end", zIndex: 10 }}
        >
          <View style={styles.container}>
            <Text style={styles.title}>Увійти</Text>
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
                onChangeText={(value) => setState((prev) => ({ ...prev, password: value }))}
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
          style={styles.buttonLogin}
          onPress={onCheckLogin}
        >
          <Text style={styles.textBtnLogin}>Увійти</Text>
        </Pressable>
        <Pressable
          style={styles.buttonRegistration}
          onPress={() => navigation.navigate("Registration")}
        >
          <Text>Немає аккаунту? Зареєструватися</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "auto",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 27,
    backgroundColor: "#FFFFFF",
  },
  image: {
    position: "relative",
    flex: 1,
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
  buttonLogin: {
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
  buttonRegistration: {
    marginTop: 16,
    alignItems: "center",
  },
});
export default Login;