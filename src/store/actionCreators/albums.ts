import {store} from "../index";
import {instance} from "../../api";
import {albumsSlice} from "../reducers/albumsSlice";
import {postSlice} from "../reducers/postSlice";
import {IAlbum, INewAlbum, INewPost, IPost} from "../../types/types";

export const loadAlbums = () => {
    const {startLoading, successLoading, failLoading} = albumsSlice.actions;
    return async (dispatch) => {
        try {
            const {albums} = store.getState().albums;

            if (albums.length){
                return
            }

            dispatch(startLoading());
            const response = await instance.get("/albums");
            console.log("Loading albums");
            dispatch(successLoading(response.data));
        }catch (error){
            dispatch(failLoading(error.message));
        }
    }
}

export const deleteAlbum = (albumId: number) => {
    const {failLoading, albumDeleting} = albumsSlice.actions;
    return async (dispatch) => {
        try {
            await instance.delete(`/albums/${albumId}`);
            dispatch(albumDeleting(albumId))
        }catch (error){
            dispatch(failLoading(error.message));

        }
    }
}

export const addEmptyAlbum = (newAlbum:INewAlbum) => {
    const {emptyAlbumAdding, failLoading} = albumsSlice.actions;

    return async (dispatch) => {
        try {
            const response = await instance.post("/albums",JSON.stringify(newAlbum));
            dispatch(emptyAlbumAdding(response.data));
        }catch (error){
            dispatch(failLoading(error.message));
        }
    }
}

export const changeAlbum = (changingAlbum:IAlbum) => {
    const {albumChanging, failLoading} = albumsSlice.actions;

    return async (dispatch) => {
        try {
            const response = await instance.put(`/albums/${changingAlbum.id}`,JSON.stringify(changingAlbum));
            dispatch(albumChanging(response.data));
        }catch (error){
            dispatch(failLoading(error.message));
        }
    }
}