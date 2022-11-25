import {combineReducers} from "@reduxjs/toolkit";
import {postSlice} from "./postSlice";
import {commentsSlice} from "./commentsSlice";
import {albumsSlice} from "./albumsSlice";
import {photosSlice} from "./photosSlice";
import {todosSlice} from "./todosSlice";

export const rootReducer = combineReducers({
    posts: postSlice.reducer,
    comments: commentsSlice.reducer,
    albums: albumsSlice.reducer,
    photos: photosSlice.reducer,
    todos: todosSlice.reducer
})

export type RootState = ReturnType<typeof rootReducer>;
