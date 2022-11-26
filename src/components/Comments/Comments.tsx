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
import {loadPosts} from "../../store/actionCreators/posts";
import {Post} from "../Post/Post";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";

export const Comments: FC = () => {
    const {comments,loading,error} = useAppSelector(state => state.comments);
    const {posts} = useAppSelector(state => state.posts)
    const dispatch = useAppDispatch();
    const {postId} = useParams();
    const currentPost = posts.find(post => post.id.toString() === postId);


    useEffect(() => {
        dispatch(loadPosts());

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
            {currentPost? <Post post={currentPost} postId={postId} isOpen={true} /> : null}
            {comments.length
            ? null
            : <Card className="comment">
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