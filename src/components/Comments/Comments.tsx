import React, {FC, useEffect} from 'react';
import {Comment} from "../Comment/Comment";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {loadComments} from "../../store/actionCreators/comments";
import {useParams} from "react-router-dom";
import {getCurrentPost} from "../../store/actionCreators/posts";
import {Post} from "../Post/Post";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import {LoadingBar} from "../LoadingBar/LoadingBar";
import {ShowError} from "../ShowError/ShowError";

export const Comments: FC = () => {
    const {comments,loading,error} = useAppSelector(state => state.comments);
    const {currentPost} = useAppSelector(state => state.posts)
    const dispatch = useAppDispatch();
    const {postId} = useParams();


    useEffect(() => {
        if (postId){
            dispatch(getCurrentPost(postId));
        }

        dispatch(loadComments(postId));
    },[postId])

    if (loading) return <LoadingBar/>

    if (error) return <ShowError error={error}/>

    return (
        <div className="comments">
            {currentPost? <Post post={currentPost} isOpen={true} /> : null}
            {comments.length
            ? null
            : <Card className="comment noComments" variant="outlined">
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            No comments!
                        </Typography>
                    </CardContent>

                </Card>}

            {comments.map(comment => {
                return <Comment key={comment.id} comment={comment}/>
            })}
        </div>
    );
};