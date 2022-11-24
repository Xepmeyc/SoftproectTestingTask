import {instance} from "../../api";
import {photosSlice} from "../reducers/photosSlice";

export const loadPhotosInAlbum = (albumId:string) => {
    const {startLoading, successLoading, failLoading} = photosSlice.actions;
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await instance.get(`/photos?albumId=${albumId}`);
            console.log("Loading photos")
            dispatch(successLoading(response.data));
        }catch (error){
            dispatch(failLoading(error.message));
        }
    }
}