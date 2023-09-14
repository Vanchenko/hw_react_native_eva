import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable, uploadBytes } from 'firebase/storage';
import { signInWithEmailAndPassword } from "firebase/auth";
import { db, storage, auth } from "./config";

export const postsCollectionRef = collection(db, "posts");
export const commentsCollectionRef = collection(db, "comments");

export const addPostFirebase = (newPost) => {
    return addDoc(postsCollectionRef, newPost);
};
export const addCommentFirebase = (newComment) => {
    return addDoc(commentsCollectionRef, newComment);
};

export const updatePostCountCommentsFirebase = async (docId, count) => {
    try {
        const ref = doc(db, "posts", docId);
        return updateDoc(ref, {
            commentsCount: count
        });
    } catch (error) {
        console.log(error);
    }
};

export const updatePostFirebase = async (docId, data) => {
    try {
        const ref = doc(db, "posts", docId);
        return updateDoc(ref, {
            namePost: data.namePost,
            convertedCoordinate: data.convertedCoordinate,
            photo: data.photo,
            location: data.location,
        });
    } catch (error) {
        console.log(error);
    }
};

export const deletePostFirebase = (id) => {
    const postDoc = doc(db, "posts", id);
    return deleteDoc(postDoc);
};

export const getAllPostsFirebase = () => {
    return getDocs(postsCollectionRef);
};

export const loadAvatarToServer = async (photoURL, filename) => {
    try {
        const response = await fetch(photoURL);
        const file = await response.blob();
        const dataRef = ref(storage, `avatar/${filename}`);
        await uploadBytesResumable(dataRef, file);
        const avatarPhoto = await getDownloadURL(
            ref(storage, `avatar/${filename}`)
        );
        return avatarPhoto;
    } catch (error) {
        console.log(error);
    }
};

export const loadPhotoToServer = async (photoURL, filename) => {
    try {
        const response = await fetch(photoURL);
        const file = await response.blob();
        const dataRef = ref(storage, `photo/${filename}`);
        const test = await uploadBytesResumable(dataRef, file);
        const postPhoto = await getDownloadURL(
            ref(storage, `photo/${filename}`)
        );
        return postPhoto;
    } catch (error) {
        console.log(error);
    }
};

export const loginDB = async ({ email, password }) => {
    try {
        const credentials = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        console.log('loginDB', credentials);
        return credentials.user;
    } catch (error) {
        throw error;
    }
};