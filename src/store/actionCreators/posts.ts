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
    const {failLoading, postDeleting} = postSlice.actions;
    return async (dispatch) => {
        try {
            await instance.delete(`/posts/${postId}`);
            dispatch(postDeleting(postId))
        }catch (error){
            dispatch(failLoading(error.message));
        }
    }
}

export const addPost = (newPost:INewPost) => {
    const {postAdding, failLoading, postLoading} = postSlice.actions;

    return async (dispatch) => {
        try {
            dispatch(postLoading());
            const response = await instance.post("/posts",JSON.stringify(newPost));
            dispatch(postAdding(response.data));
        }catch (error){
            dispatch(failLoading(error.message));
        }
    }
}

export const changePost = (changedPost:IPost) => {
    const {postChanging, failLoading, postLoading} = postSlice.actions;

    return async (dispatch) => {
        try {
            dispatch(postLoading());
            const response = await instance.put(`/posts/${changedPost.id}`,JSON.stringify(changedPost));
            dispatch(postChanging(response.data));
        }catch (error){
            dispatch(failLoading(error.message));
        }
    }
}

export const getCurrentPost = (postId: string) => {
    const {failLoading, setCurrentPost} = postSlice.actions;

    return async (dispatch) => {
        try {
            const {currentPost} = store.getState().posts;

            if (currentPost && currentPost.id.toString() === postId){
                return
            }

            const response = await instance.get(`/posts/${postId}`);
            dispatch(setCurrentPost(response.data));
        }catch (error){
            dispatch(failLoading(error.message));
        }
    }
}