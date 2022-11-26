import React, {FC, useEffect} from 'react';
import {Post} from  "../Post/Post"
import {useAppSelector} from "../../hooks/useAppSelector";
import {loadPosts} from "../../store/actionCreators/posts";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {NavLink} from "react-router-dom";
import Button from "@mui/material/Button";
import {LoadingBar} from "../LoadingBar/LoadingBar";
import {ShowError} from "../ShowError/ShowError";


export const Posts: FC = () => {
    const {posts,loading,error} = useAppSelector(state => state.posts);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadPosts())
    },[])

    if (loading) return <LoadingBar/>

    if (error) return <ShowError error={error}/>

    return (
        <div>
            <Button variant="contained">
                <NavLink to="create"> New Post </NavLink>
            </Button>
            {posts.map((post) => {
                return <Post key={post.id} post={post} isOpen={false}/>
            })}
        </div>
    );
};