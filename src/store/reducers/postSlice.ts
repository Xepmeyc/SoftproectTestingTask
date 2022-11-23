import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPost} from "../../types/types";

interface PostState {
    posts: Array<IPost>
    loading: boolean
    error: null | string
}

const initialState: PostState = {
    posts: [],
    loading: true,
    error: null
}

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        startLoading: () => ({
            ...initialState,
            loading: true
        }),
        successLoading: (state, action) => {
            state.posts = action.payload;
            state.loading = false;
        },
        failLoading: (state,action) => {
            state.error = action.payload;
            state.loading = false;
        },
        postLoading: (state) => {
            state.loading = true;
        },
        addingPost: (state, action) => {
            state.posts.unshift(action.payload);
            state.loading = false;
        },
        changingPost: (state, action) => {
            state.posts = state.posts.map(post => {
                if (post.id === action.payload.id){
                    return action.payload;
                }

                return post;
            });
            state.loading = false;
        }
    },
})