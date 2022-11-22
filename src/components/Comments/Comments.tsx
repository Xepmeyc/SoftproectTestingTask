import React, {FC, useEffect} from 'react';
import {Comment} from "../Comment/Comment";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import {loadComments} from "../../store/actionCreators/comments";
import {useParams} from "react-router-dom";

export const Comments: FC = () => {
    const {comments,loading,error} = useAppSelector(state => state.comments);
    const dispatch = useAppDispatch();
    const {postId} = useParams();

    console.log(comments)

    useEffect(() => {
        dispatch(loadComments(postId));
    },[postId])

    if (loading){
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        );
    }

    if (error){
        return (<Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
        </Alert>)
    }

    return (
        <div>
            {comments.map(comment => {
                return <Comment key={comment.id} comment={comment}/>
            })}
        </div>
    );
};