import {createSlice} from "@reduxjs/toolkit";
import {IComment} from "../../types/types";

interface CommentState {
    comments: Array<IComment>
    loading: boolean
    error: null | string
}

const initialState: CommentState = {
    comments: [],
    loading: true,
    error: null
}

export const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        startLoading: () => ({
            ...initialState,
            loading: true
        }),
        successLoading: (state, action) => {
            state.comments = [...state.comments, ...action.payload]
            state.loading = false;
        },
        failLoading: (state,action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
})