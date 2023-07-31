import React from 'react';
import {View,Text, StyleSheet, Button, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';

 
const Post = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Публікації</Text>
      <Button
        style={styles.button}
        color='#FF6C00'
        title=" + "
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'stretch',
      padding: 0,
    },
    title : {
        backgroundColor: '#FFFFFF',
        fontSize: 30,
        marginTop: 150,
        paddingBottom: 50,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    input : {
        paddingBottom: 10,
        backgroundColor: '#E8E8E8',
        borderWidth: 1,
        borderRadius: 10,
        borderBottomColor: '#E8E8E8',
        borderBottomWidth: 1,
    },
    button : {
        backgroundColor: '#FF6C00',
        width: 70,
    }
})
export default Post;