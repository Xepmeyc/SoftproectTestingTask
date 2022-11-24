import {store} from "../index";
import {instance} from "../../api";
import {albumsSlice} from "../reducers/albumsSlice";

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
            console.log("Loading albums")
            dispatch(successLoading(response.data));
        }catch (error){
            dispatch(failLoading(error.message));
        }
    }
}