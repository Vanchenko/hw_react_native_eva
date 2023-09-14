import React from 'react';
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/selectors";
import { AntDesign } from "@expo/vector-icons";
import {
  commentsCollectionRef,
  addCommentFirebase,
  updatePostCountCommentsFirebase,
} from "../firebase/postsFirebaseOperation";
import { onSnapshot, query, where, orderBy } from "firebase/firestore";
import { FlatList } from 'react-native-gesture-handler';

 
const Comments = ({ route: { params } }) => {
  const authState = useSelector(selectUser);
  const [comments, setComments] = useState([]);
  const [inputComment, setInputComment] = useState('');
  const [visibileList, setVisibileList] = useState(false)
  const [focused, setFocused] = useState(null);
  const navigation = useNavigation();
  const { photo, namePost, id, uid, } = params;
  //console.log("namePost, id, uid ", namePost, id, uid);
  //console.log('authState in Comments', authState.photoURL);

  useEffect(() => {
    const q = query(commentsCollectionRef, where("postid", "==", id), orderBy("postdatetime","desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newData = [];
      snapshot.forEach((doc) => {
        newData.push(doc.data());
      });
      setComments(newData);
      if (comments.length > 0) { setVisibileList(true) }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const onSaveComment = () => {
    const { comment } = inputComment;
    if (comment) {
      const date = new Date();
      addCommentFirebase({
        comment,
        postdatetime: date,
        postid: id,
        userName: authState.displayName,
        userAvatar: authState.photoURL,
        userUID: authState.uid,
        unixtime: date.getTime(),
      });
      updatePostCountCommentsFirebase(id, comments.length + 1);
      setInputComment('')
    }
  }
  const commentDatetime = (unixtime ) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(unixtime).toLocaleString("uk-UA", options);
  }


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={-10                 }
        style={{ flex: 1, justifyContent: "flex-end", zIndex: 10 }}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Pressable
              style={styles.pressLogoff}
              onPress={() => navigation.navigate("Post")}
            >
              <AntDesign name="arrowleft" size={22} color="black" />
            </Pressable>
            <Text style={styles.title}>Коментарі</Text>
          </View>
          <View style={styles.wrapper}>
            <Image source={{ uri: photo }} style={styles.imagePost} />
            <Text style={styles.namePost}>{namePost}</Text>
          </View>
          <FlatList
            data={comments}
            renderItem={({
              item: { id, comment, userUID, userAvatar, userName, unixtime },
            }) => {
              return (
                <View
                  style={
                    userUID === authState.uid
                      ? {
                          ...styles.subContainer,
                          ...styles.subContainerReverse,
                        }
                      : { ...styles.subContainer }
                  }
                >
                  <Image
                    source={{ uri: userAvatar }}
                    style={styles.imageAvatar}
                  />
                  <View
                    style={
                      userUID === authState.uid
                        ? {
                            ...styles.commentWrapper,
                            ...styles.commentWrapperReverse,
                          }
                        : { ...styles.commentWrapper }
                    }
                  >
                    <Text style={styles.commentText}>{comment}</Text>
                    <Text
                      style={
                        userUID === authState.uid
                          ? {
                              ...styles.commentDate,
                              ...styles.commentDateReverse,
                            }
                          : { ...styles.commentDate }
                      }
                    >
                      {commentDatetime(unixtime)}
                    </Text>
                  </View>
                </View>
              );
            }}
            // keyExtractor={(item) => item.id}
          />
          <TextInput
            style={
              focused === "comment"
                ? { ...styles.input, ...styles.focusedInput }
                : { ...styles.input }
            }
            placeholder="Коментувати..."
            editable
            numberOfLines={1}
            maxLength={40}
            onChangeText={(value) =>
              setInputComment((prev) => ({ ...prev, comment: value }))
            }
            value={inputComment.comment}
            onFocus={() => setFocused("comment")}
            onBlur={() => setFocused(null)}
          />
          <Pressable style={styles.buttonSaveComment} onPress={onSaveComment}>
            <AntDesign name="arrowup" size={20} color="white" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
    justifyContent: "flex-start",
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
  },
  title: {
    backgroundColor: "#FFFFFF",
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    paddingBottom: 5,
    marginLeft: 80,
  },
  pressLogoff: {
    alignSelf: "center",
    marginLeft: 12,
    paddingRight: 10,
  },
  wrapper: {
    flexDirection: "column",
    marginTop: 32,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  imagePost: {
    height: 240,
    width: 343,
    borderRadius: 8,
  },
  name: {
    fontFamily: "Roboto-Medium",
    fontWeight: 700,
    fontSize: 13,
  },
  subContainer: {
    paddingHorizontal: 16,
    paddingTop: 15,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
  },
  subContainerReverse: {
    flexDirection: "row-reverse",
  },
  imageAvatar: {
    height: 30,
    width: 30,
    marginLeft: 12,
    borderRadius: 16,
  },
  commentWrapper: {
    width: 299,
    marginLeft: 12,
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: "#00000018",
  },
  commentWrapperReverse: {
    borderTopRightRadius: 0,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  commentText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
  },
  commentDate: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    color: "#BDBDBD",
    alignSelf: "flex-end",
  },
  commentDateReverse: {
    alignSelf: "flex-start",
  },
  input: {
    marginBottom: 16,
    marginTop: 12,
    paddingLeft: 16,
    alignSelf: "center",
    width: 343,
    height: 50,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 25,
    borderColor: "#E8E8E8",
  },
  focusedInput: {
    borderColor: "#FF6C00",
    borderWidth: 2,
  },
  buttonSaveComment: {
    position: "absolute",
    right: 36,
    bottom: 26,
    width: 35,
    height: 35,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 17,
  },
});
export default Comments;