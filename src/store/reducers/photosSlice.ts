import {createSlice} from "@reduxjs/toolkit";
import { IPhoto} from "../../types/types";

interface PhotoState {
    photos: Array<IPhoto>
    loading: boolean
    error: null | string
}

const initialState: PhotoState = {
    photos: [],
    loading: true,
    error: null
}

export const photosSlice = createSlice({
    name: "photos",
    initialState,
    reducers: {
        startLoading: () => ({
            ...initialState,
            loading: true
        }),
        successLoading: (state, action) => {
            state.photos = action.payload
            state.loading = false;
        },
        failLoading: (state,action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
})