import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {FC} from "react";
import {IPost} from "../../types/types";
import {NavLink, Outlet} from "react-router-dom";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {deletePosts} from "../../store/actionCreators/posts";

export const Post: FC<{post: IPost, postId: string | undefined}> = ({post, postId}) => {
    const dispatch = useAppDispatch();

    const deletePost = () => {
        dispatch(deletePosts(post.id));
    }
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {post.title}
                </Typography>
                <Typography variant="h5" component="div">
                    {post.body}
                </Typography>
            </CardContent>
            <CardActions>
                <NavLink to = {postId? "/posts" : post.id.toString()}>
                    <Button size="small">Learn More</Button>
                </NavLink>

                <NavLink to ={`/edit/${post.id}`}>
                    <Button size="small">Edit</Button>
                </NavLink>
                <Button onClick={deletePost} size="small">Delete</Button>
            </CardActions>
            {post.id.toString() === postId? <Outlet />: ""}
        </Card>
    );
};