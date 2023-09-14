import { createSlice } from "@reduxjs/toolkit";
import uuid from 'react-native-uuid';

const postsInitialState = {
    posts: [
        //   {
        //     id: uuid.v4(),
        //     imageUrl: "../assets/images/sky.jpg",
        //     name: "Ліс",
        //     commentsNumber: 0,
        //     location: "Ivano-Frankivs'k Region, Ukraine",
        //   },
        //   {
        //     id: uuid.v4(),
        //     imageUrl: "../assets/images/sunset.jpg",
        //     name: "Захід на Чорному морі",
        //     commentsNumber: 0,
        //     location: "Ukraine",
        //   },
        //   {
        //     id: uuid.v4(),
        //     imageUrl: "../assets/images/house.jpg",
        //     name: "Старий будиночок у Венеції",
        //     commentsNumber: 0,
        //     location: "Ukraine",
        //   },
    ]
};
export const postsSlice = createSlice({
    name: "posts",
    initialState: postsInitialState,
    reducers: {
        addPost: {
            reducer(state, { payload }) {
                state.posts.push(payload);
            },
            prepare({
                photoName,
                locationName,
                photoUri,
                commentsNumber = 0,
                location,
            }) {
                return {
                    payload: {
                        id: uuid.v4(),
                        name: photoName,
                        imageUrl: photoUri,
                        location: locationName,
                        commentsNumber,
                        coords: location,
                    },
                };
            },
        },
    },
});

export const { addPost } = postsSlice.actions;
export const postsReducer = postsSlice.reducer
