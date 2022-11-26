import {createSlice} from "@reduxjs/toolkit";
import {IPost} from "../../types/types";

interface PostState {
    posts: Array<IPost>
    currentPost: IPost | null
    loading: boolean
    error: null | string
}

const initialState: PostState = {
    posts: [],
    currentPost: null,
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
        postAdding: (state, action) => {
            state.posts.unshift(action.payload);
            state.loading = false;
        },
        postDeleting: (state, action) => {
            state.posts = state.posts.filter(post => post.id !== action.payload);
            state.loading = false;
        },
        postChanging: (state, action) => {
            state.posts = state.posts.map(post => {
                if (post.id === action.payload.id){
                    return action.payload;
                }

                return post;
            });
            state.loading = false;
        },
        setCurrentPost: (state, action) => ({
            ...state,
            currentPost: action.payload,
            loading: false
        }),
    },
})