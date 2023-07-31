import React from 'react';
import {View,Text, TextInput, StyleSheet, Button, 
 Pressable, Alert, ImageBackground, KeyboardAvoidingView,
 Platform, Keyboard, TouchableWithoutFeedback} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackImage from './image/PhotoBG.png';

// const image = {uri: '../image/PhotoBG.png'}
const Login = () => {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const navigation = useNavigation();

  return (
  <KeyboardAvoidingView  behavior={Platform.OS=='ios' ? 'padding' : 'height'}
      style={{flex:1}} >
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  <View style={styles.container}>
  <ImageBackground source={BackImage} style={styles.image}>
    <View style={styles.loginWrapper}>
      <Text style={styles.title}>Увійти</Text>
        <TextInput
        style={styles.input}
        placeholder='Адреса електронної пошти'
        editable
        numberOfLines={1}
        maxLength={40}
        onChangeText={text => onChangeEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder='Пароль'
        autoComlete='password'
        secureTextEntry={true}
        editable
        numberOfLines={1}
        maxLength={40}
        onChangeText={text => onChangePassword(text)}
        value={password}
      />
      <Pressable style={styles.buttonLogin}
          onPress={() => navigation.navigate("Post")}>
        <Text style={styles.textBtnLogin}>Увійти</Text>
      </Pressable>
      <Pressable style={styles.buttonRegistration}
          onPress={() => navigation.navigate("Registration")}>
        <Text>Немає аккаунту? Зареєструватися</Text>
      </Pressable>
    </View>
    </ImageBackground>
  </View>
  </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image : {
      flex: 1,
      justifyContent: "flex-end",
    },
    loginWrapper : {
      paddingTop: 32,
      paddingLeft: 16,
      paddingRight: 16,
      paddingBottom: 111,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      backgroundColor: '#FFFFFF',
    },
    title : {
      alignSelf: 'center',
      backgroundColor: '#FFFFFF',
      fontSize: 30,
      paddingBottom: 32,
      justifyContent: 'center',
    },
    input : {
      marginBottom: 16,
      paddingLeft: 16,
      height: 50,
      backgroundColor: '#F6F6F6',
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#E8E8E8',
    },
    buttonLogin : {
      marginTop: 27,
      height: 51,
      backgroundColor: '#FF6C00',
      justifyContent: 'center',
      borderRadius: 100,
    },
    textBtnLogin: {
      fontSize: 16,
      alignSelf: 'center',
      justifyContent: 'center',
      color: '#FFFFFF'
    },
    buttonRegistration : {
      marginTop: 16,
     // marginBottom: 16,
      alignItems: 'center',
    }
})
export default Login;


{/* <Button
style={styles.buttonLogin}
color='#FF6C00'
title="Увійти"
onPress={() => navigation.navigate("Post")}
/>
<Button
style={styles.buttonRegistration}
color='#FF6C00'
title="Зареєструватися"
onPress={() => navigation.navigate("Registration")}
/> */}