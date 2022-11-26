import {createSlice} from "@reduxjs/toolkit";
import {IAlbum} from "../../types/types";

interface AlbumState {
    albums: Array<IAlbum>
    loading: boolean
    error: null | string
}

const initialState: AlbumState = {
    albums: [],
    loading: true,
    error: null
}

export const albumsSlice = createSlice({
    name: "album",
    initialState,
    reducers: {
        startLoading: () => ({
            ...initialState,
            loading: true
        }),
        successLoading: (state, action) => {
            state.albums = [...state.albums, ...action.payload]
            state.loading = false;
        },
        failLoading: (state,action) => {
            state.error = action.payload;
            state.loading = false;
        },
        emptyAlbumAdding: (state, action) => {
            state.albums.unshift(action.payload);
            state.loading = false;
        },
        albumDeleting: (state, action) => {
            state.albums = state.albums.filter(post => post.id !== action.payload);
            state.loading = false;
        },
        albumChanging: (state, action) => {
            state.albums = state.albums.map(post => {
                if (post.id === action.payload.id){
                    return action.payload;
                }

                return post;
            });
            state.loading = false;
        }
    },
})