import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
    user: { email: "", name: "", uid:"", photoURL: null },
};
export const authSlice = createSlice({
    name: "auth",
    initialState: authInitialState,
    reducers: {
        createUser(state, { payload }) {
          //  state.user.email = payload.email;
            //  state.user.password = payload.password;
            state.user = payload;
        },
        logIn(state, { payload }) {
            state.user = payload;
        },
        updateUserAvatar(state, { payload }) {
            state.user.photoURL = payload;
        },
        logOut(state) {
            state.user = { email: "", name: "", uid: "", photoURL: null };
        },
    },
});

export const { createUser, logIn, logOut, updateUserAvatar } = authSlice.actions;
export const authReducer = authSlice.reducer;
