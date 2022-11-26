import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {FC} from "react";
import {IPost} from "../../types/types";
import {NavLink, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {deletePosts} from "../../store/actionCreators/posts";

interface IProps {
    post: IPost
    isOpen: boolean
}

export const Post: FC<IProps> = ({post,isOpen= false}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const deletePost = () => {
        dispatch(deletePosts(post.id));
        navigate("/posts");
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
                {isOpen
                    ? null
                    : <NavLink to = {post.id.toString()}>
                        <Button size="small">Learn More</Button>
                    </NavLink>}

                <NavLink to ={isOpen? `/posts/edit/${post.id}`: `edit/${post.id}`}>
                    <Button size="small">Edit</Button>
                </NavLink>
                <Button onClick={deletePost} size="small">Delete</Button>
            </CardActions>
        </Card>
    );
};