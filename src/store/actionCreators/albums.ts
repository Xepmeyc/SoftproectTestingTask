import {store} from "../index";
import {instance} from "../../api";
import {albumsSlice} from "../reducers/albumsSlice";
import {IAlbum, INewAlbum} from "../../types/types";

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

export const getCurrentAlbum = (albumId: string) => {
    const {failLoading, setCurrentAlbum} = albumsSlice.actions;

    return async (dispatch) => {
        try {
            const {currentAlbum} = store.getState().albums;

            if (currentAlbum && currentAlbum.id.toString() === albumId){
                return
            }

            const response = await instance.get(`/albums/${albumId}`);
            console.log("Getting album", albumId)
            dispatch(setCurrentAlbum(response.data));
        }catch (error){
            dispatch(failLoading(error.message));
        }
    }
}