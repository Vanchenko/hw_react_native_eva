import { useState } from "react";
import {View,Text, TextInput, StyleSheet, Pressable, Image, ImageBackground, Alert,
  KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackImage from './image/PhotoBG.png';
import Mycamera from './Mycamera';

 
const Registration = () => {
  const [login, onChangeLogin] = useState('');
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [visiblePassword, useVisiblePassword] = useState(true);
  const [focused, setFocused] = useState(null);
  const navigation = useNavigation();

  const onAva = () => {
    <Mycamera/>
  }
  const onCheckRegistration = () => {
    Alert.alert("Registration data :", `${login} and ${email} and ${password}`);
    navigation.navigate("Home");
  }

return (
  <ImageBackground source={BackImage} style={styles.image}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{ flex: 1, justifyContent: "flex-end", zIndex: 10 }}
      >
        <View style={styles.container}>
          <Image
            source={require("./image/ava-blank.png")}
            style={styles.avatar}
          />
          <Pressable style={styles.pressAvatarAdd} onPress={() => Mycamera}>
            {/* onPress={() => Alert.alert("Take a picture for avatar!!!!!!!")}> */}
            <Image source={require("./image/ava-add.png")} />
          </Pressable>
          <Text style={styles.title}>Реєстрація</Text>
          <TextInput
            style={
              focused === "login"
                ? { ...styles.input, ...styles.focusedInput }
                : { ...styles.input }
            }
            placeholder="Логін"
            editable
            numberOfLines={1}
            maxLength={40}
            onChangeText={(text) => onChangeLogin(text)}
            value={login}
            onFocus={() => setFocused("login")}
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
            onChangeText={(text) => onChangeEmail(text)}
            value={email}
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
              onChangeText={(text) => onChangePassword(text)}
              value={password}
              onFocus={() => setFocused("password")}
              onBlur={() => setFocused(null)}
            />
            {password && (
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
  registrationWrapper: {},
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
