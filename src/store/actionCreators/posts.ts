import {postSlice} from "../reducers/postSlice";
import {instance} from "../../api";
import {store} from "../index";
import {INewPost, IPost} from "../../types/types";


export const loadPosts = (isNoReloading = true) => {
    const {startLoading, successLoading, failLoading} = postSlice.actions;
    return async (dispatch) => {
        try {
            const {posts} = store.getState().posts;

            if (isNoReloading && posts.length){
                return
            }

            dispatch(startLoading());
            const response = await instance.get("/posts");
            console.log("Loading posts");
            dispatch(successLoading(response.data));
        }catch (error){
            dispatch(failLoading(error.message));
        }
    }
}
export const deletePosts = (postId: number) => {
    const {failLoading} = postSlice.actions;
    return async (dispatch) => {
        try {
            const response = await instance.delete(`/posts/${postId}`);
            if (response.data){
                dispatch(loadPosts(false))
            }
        }catch (error){
            dispatch(failLoading(error.message));

        }
    }
}

export const addPost = (newPost:INewPost) => {
    const {addingPost, failLoading, postLoading} = postSlice.actions;

    return async (dispatch) => {
        try {
            dispatch(postLoading());
            const response = await instance.post("/posts",JSON.stringify(newPost));
            dispatch(addingPost(response.data));
        }catch (error){
            dispatch(failLoading(error.message));
        }
    }
}

export const changePost = (changedPost:IPost) => {
    const {changingPost, failLoading, postLoading} = postSlice.actions;

    return async (dispatch) => {
        try {
            dispatch(postLoading());
            const response = await instance.put(`/posts/${changedPost.id}`,JSON.stringify(changedPost));
            dispatch(changingPost(response.data));
        }catch (error){
            dispatch(failLoading(error.message));
        }
    }
}