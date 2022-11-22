import {postSlice} from "../reducers/postSlice";
import {instance} from "../../api";
import {store} from "../index";

export const loadPosts = () => {
    const {startLoading, successLoading, failLoading} = postSlice.actions;
    return async (dispatch) => {
        try {
            const posts = store.getState().posts.posts;
            if (posts.length){
                return
            }

            dispatch(startLoading());
            const response = await instance.get("/posts");
            dispatch(successLoading(response.data));
        }catch (error){
            dispatch(failLoading(error.message));
        }
    }
}