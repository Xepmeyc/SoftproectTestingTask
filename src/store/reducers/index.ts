import {combineReducers} from "@reduxjs/toolkit";
import {postSlice} from "./postSlice";
import {commentsSlice} from "./commentsSlice";

export const rootReducer = combineReducers({
    posts: postSlice.reducer,
    comments: commentsSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>;
