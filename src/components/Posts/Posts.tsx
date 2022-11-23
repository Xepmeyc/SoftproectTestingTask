import React, {FC, useEffect} from 'react';
import {Post} from  "../Post/Post"
import {useAppSelector} from "../../hooks/useAppSelector";
import {loadPosts} from "../../store/actionCreators/posts";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import {NavLink, useParams} from "react-router-dom";
import Button from "@mui/material/Button";


export const Posts: FC = () => {
    const {posts,loading,error} = useAppSelector(state => state.posts);
    const dispatch = useAppDispatch();
    const {postId} = useParams();

    useEffect(() => {
        dispatch(loadPosts())
    },[])

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
            <Button variant="contained">
                <NavLink to="/create"> New Post </NavLink>
            </Button>
            {posts.map((post) => {
                return <Post key={post.id} post={post} postId={postId}/>
            })}
        </div>
    );
};