import {instance} from "../../api";
import {photosSlice} from "../reducers/photosSlice";
import {store} from "../index";

export const loadPhotosInAlbum = (albumId:string) => {
    const {startLoading, successLoading, failLoading} = photosSlice.actions;
    return async (dispatch) => {
        try {
            const {photos} = store.getState().photos;
            const isLoad = photos.some(photo => photo.albumId.toString() === albumId);
            if (isLoad){
                return
            }
            dispatch(startLoading());
            const response = await instance.get(`/photos?albumId=${albumId}`);
            dispatch(successLoading(response.data));
        }catch (error){
            dispatch(failLoading(error.message));
        }
    }
}