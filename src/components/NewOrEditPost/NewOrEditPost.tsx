import React, {FC, useEffect, useState} from 'react';
import {TextField} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useAppSelector} from "../../hooks/useAppSelector";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import {addPost, changePost, getCurrentPost, loadPosts} from "../../store/actionCreators/posts";
import {LoadingBar} from "../LoadingBar/LoadingBar";
import {ShowError} from "../ShowError/ShowError";
import {INewPost} from "../../types/types";

export const NewOrEditPost: FC = () => {

    const initialState = {
        body: "",
        title: "",
        userId: Date.now(),
    };

    const [newPost, setNewPost] = useState<INewPost>(initialState)

    const {id} = useParams();
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const {loading, error, currentPost} = useAppSelector(state => state.posts);

    useEffect(() => {
        if (id) {
            dispatch(getCurrentPost(id));
        } else {
            dispatch(loadPosts());
        }

        setInitialState();

    },[currentPost]);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === "title") {
            setNewPost({...newPost, title: event.target.value});
            return;
        }

        setNewPost({...newPost, body: event.target.value});
    };

    const createNewPost = () => {
        dispatch(addPost(newPost));
        navigate("/posts");
    }

    const saveEdit = () => {
        if (currentPost){
            dispatch(changePost({
                body: newPost.body,
                userId: currentPost.userId,
                title: newPost.title,
                id: currentPost.id})
            )
            navigate("/posts");

        }

    }

    const clearPost = () => {
        setNewPost(initialState);
    }

    const setInitialState = () => {
        if (!id){
            setNewPost(initialState);
            return
        }

        if (currentPost){
            setNewPost({...newPost, body: currentPost.body, title: currentPost.title})
        }
    }

    return (
        <div className="newOrEditPost">
            <div className="newOrEditPostInput">
                <TextField
                    name="title"
                    className="newPostInput"
                    id="standard-textarea"
                    label="Post title"
                    placeholder="Post title"
                    multiline
                    variant="outlined"
                    value={newPost.title}
                    onChange={handleChange}
                />
            </div>
            <div className="newOrEditPostInput">
                <TextField
                    className="newPostInput"
                    name="body"
                    id="outlined-multiline-static"
                    label="Post body"
                    multiline
                    rows={4}
                    value={newPost.body}
                    onChange={handleChange}
                />
            </div>
            <div className="newOrEditButtonPanel">
                <Button sx = {{mr: "auto"}} onClick={currentPost ? saveEdit: createNewPost} variant="contained" endIcon={<SendIcon />}>
                    Send
                </Button>

                {currentPost
                    ? <Button onClick={setInitialState} variant="contained" >
                        Undo
                    </Button>
                    : null
                }

                <Button sx= {{bgcolor: "error.main"}} onClick={clearPost} variant="contained" >
                    Clear
                </Button>
            </div>

            {loading
                ? <LoadingBar/>
                : null
            }
            {error
                ? <ShowError error={error}/>
                : null
            }
        </div>
    );
};