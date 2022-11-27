import {commentsSlice} from "../reducers/commentsSlice";
import {instance} from "../../api";
import {store} from "../index";

export const loadComments = (postId) => {
    const {startLoading, successLoading, failLoading} = commentsSlice.actions;
    return async (dispatch) => {
        try {
            const {comments} = store.getState().comments;
            const isCommentsLoaded = comments.some(comment => comment.postId.toString() === postId);

            if (comments.length && isCommentsLoaded){
                return
            }
            dispatch(startLoading());
            const response = await instance.get(`/posts/${postId}/comments`);
            dispatch(successLoading(response.data));
        }catch (error){
            dispatch(failLoading(error.message));
        }
    }
}

export const deleteComment = (commentId: number) => {
    const {failLoading, commentDeleting} = commentsSlice.actions;
    return async (dispatch) => {
        try {
            await instance.delete(`/comments/${commentId}`);
            dispatch(commentDeleting(commentId))
        }catch (error){
            dispatch(failLoading(error.message));

        }
    }
}
