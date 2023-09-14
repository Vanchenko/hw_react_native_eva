// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
// import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";
// add WARN from EXPO
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
// const auth = initializeAuth(app, { persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });

const firebaseConfig = {
  apiKey: 'AIzaSyCzei_elwxcdj-c41KgynpiAx01-fTEALs',
  authDomain: 'reactnativeeva2023.firebaseapp.com',
    //databaseURL: 'https://reactnativeeva2023.firebaseio.com',
  projectId: 'reactnativeeva2023',
  storageBucket: 'reactnativeeva2023.appspot.com',
  messagingSenderId: '72227579608',
  appId: '1:72227579608:web:781159f7b5c4d27c0819ad',
  measurementId: 'G-L35PNPJ67T',
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {persistence: getReactNativePersistence(AsyncStorage)});
//export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);