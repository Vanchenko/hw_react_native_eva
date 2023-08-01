import React from 'react';
import {View,Text, StyleSheet, Button, Alert, Pressable, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';

 
const Post = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Публікації</Text>
        <Pressable style={styles.pressLogoff}
            onPress={() => navigation.navigate("Login")}>
            <Image source={require('./image/log-out.png')} />
        </Pressable>
        </View>
        <View style={styles.wrapper}>
          <Image source={require('./image/ava-romanova.png')} />
            <View style={styles.wrapperUserInfo}>
              <Text style={styles.name}>Natali Romanchuk</Text>
              <Text style={styles.email}>email@gmail.com</Text>
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    header: {
      flexDirection: 'row',
      marginTop: 44,
      paddingBottom: 11,
      justifyContent: 'flex-end',
      borderBottomWidth: 1,
      borderColor: '#E8E8E8',
    },
    title : {
        backgroundColor: '#FFFFFF',
        fontSize: 17,
        paddingBottom: 5,
        // alignSelf: 'center',
        // justifyContent: 'center',
    },
    pressLogoff : {
       alignSelf: 'center',
       marginLeft: 120,
       paddingRight: 10,
    },
    wrapper: {
      flexDirection: 'row',
      marginTop: 32,
      paddingLeft: 16,
      alignItems: 'center',
    },
    wrapperUserInfo: {
      flexDirection: 'column',
      paddingLeft: 8,
    },
    name : {
      fontWeight: 700,
      fontSize: 13,
    },
    email : {
      fontWeight: 400,
      fontSize: 11,
    },
})
export default Post;