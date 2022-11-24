import React, {FC, useEffect} from 'react';
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import {INewPost, IPost} from "../../types/types";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {addPost, changePost, loadPosts} from "../../store/actionCreators/posts";
import {useAppSelector} from "../../hooks/useAppSelector";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import {useParams} from "react-router-dom";

export const NewOrEditPost: FC = () => {
    const newPost:INewPost = {
        userId: Date.now(),
        title: "",
        body: ""
    }

    const [title, setTitle] = React.useState('');
    const [body, setBody] = React.useState('');

    const {id} = useParams();

    const dispatch = useAppDispatch();
    const {loading, error, posts} = useAppSelector(state => state.posts);

    const currentPost = posts.find(post => post.id.toString() === id);


    useEffect(() => {
        dispatch(loadPosts());

        setInitialState();

    },[]);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === "title") {
            setTitle(event.target.value);
            return;
        }

        setBody(event.target.value);
    };

    const createNewPost = () => {
        newPost.body = body;
        newPost.title = title;

        dispatch(addPost(newPost));
    }

    const saveEdit = () => {
        if (currentPost){
            dispatch(changePost({
                body,
                userId: currentPost.userId,
                title,
                id: currentPost.id})
            )
        }

    }

    const clearPost = () => {
        setBody("");
        setTitle("");
    }

    const setInitialState = () => {
        if (currentPost){
            setBody(currentPost.body);
            setTitle(currentPost.title);
        }
    }

    return (
        <div>
            <div className="newPost">
                <TextField
                    name="title"
                    className="newPostInput"
                    id="standard-textarea"
                    label="Post title"
                    placeholder="Placeholder"
                    multiline
                    variant="standard"
                    value={title}
                    onChange={handleChange}
                />
            </div>
            <div className="newPost">
                <TextField
                    className="newPostInput"
                    name="body"
                    id="outlined-multiline-static"
                    label="Post body"
                    multiline
                    rows={4}
                    value={body}
                    onChange={handleChange}
                />
            </div>
            <Button onClick={currentPost ? saveEdit: createNewPost} variant="contained" endIcon={<SendIcon />}>
                Send
            </Button>

            {currentPost
                ? <Button onClick={setInitialState} variant="contained" >
                    Undo
                </Button>
                : null
            }

            <Button onClick={clearPost} variant="contained" >
                Clear
            </Button>

            {loading
                ? <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                      </Box>
                : null
            }
            {
                error
                    ? <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {error}
                      </Alert>
                    : null
            }
        </div>
    );
};