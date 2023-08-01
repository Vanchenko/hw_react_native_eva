import React from 'react';
import {View,Text, TextInput, StyleSheet, Pressable, Image, ImageBackground, Alert,
  KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackImage from './image/PhotoBG.png';
 
const Registration = () => {
  const [login, onChangeLogin] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const navigation = useNavigation();

  return (
  <KeyboardAvoidingView  behavior={Platform.OS=='ios' ? 'padding' : 'height'} style={{flex:1}} >
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <ImageBackground source={BackImage} style={styles.image}>
      <View style={styles.registrationWrapper}>
        <Image source={require('./image/ava-blank.png')} style={styles.avatar}/>
        <Pressable style={styles.pressAvatarAdd}
          onPress={() => Alert.alert("Take a picture for avatar!")}>
          <Image source={require('./image/ava-add.png')} />
        </Pressable>
      <Text style={styles.title}>Реєстрація</Text>
        <TextInput
          style={styles.input}
          placeholder='Логін'
          editable
          numberOfLines={1}
          maxLength={40}
          onChangeText={text => onChangeLogin(text)}
          value={login}
        />
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
        <Pressable style={styles.buttonNewRegistration}
          onPress={() => navigation.navigate("Login")}>
          <Text style={styles.textBtnLogin}>Зареєструватися</Text>
        </Pressable>
        <Pressable style={styles.buttonAlreadyLogin}
          onPress={() => navigation.navigate("Login")}>
          <Text>Вже є аккаунт? Увійти</Text>
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
  registrationWrapper : {
    paddingTop: 92,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 45,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: 'stretch',
    backgroundColor: '#FFFFFF',
  },
  avatar : {
    alignSelf: 'center',
    marginTop: -60,
    position: 'absolute',
  },
  pressAvatarAdd : {
    position: 'absolute',
    marginTop: 21,
    marginLeft: 247,
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
    buttonNewRegistration : {
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
    buttonAlreadyLogin : {
      marginTop: 16,
      alignItems: 'center',
    }
})
export default Registration;
