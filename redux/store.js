import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./postSlice";
import { authReducer } from "./authSlice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistPostsConfig = {
  key: "posts",
  storage: AsyncStorage,
};
const persistAuthConfig = {
  key: "auth",
  storage: AsyncStorage,
};

const persistedPostsReducer = persistReducer(persistPostsConfig, postsReducer);
const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);


export const store = configureStore({
  reducer: {
    posts: persistedPostsReducer,
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);
export default { store, persistor };
