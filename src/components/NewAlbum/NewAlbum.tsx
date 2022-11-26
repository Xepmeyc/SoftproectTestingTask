import React, {FC, useState} from 'react';
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {deletePosts} from "../../store/actionCreators/posts";
import {INewAlbum} from "../../types/types";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {addEmptyAlbum} from "../../store/actionCreators/albums";

export const NewAlbum:FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const newAlbum: INewAlbum = {
        title: "",
        userId: Date.now()
    }
    const [newAlbumTitle, setNewAlbumTitle] = useState("");

    const createNewAlbum = () => {
        newAlbum.title = newAlbumTitle;
        dispatch(addEmptyAlbum(newAlbum));
        navigate("/albums");
    }

    const changeHandle = (event: React.ChangeEvent<HTMLInputElement> ) => {
        setNewAlbumTitle(event.target.value);
    }

    const cancel = () => {
        navigate("/albums");
    }

    return (
        <div>
            <TextField onChange={changeHandle} id="outlined-basic" label="Outlined" variant="outlined" />
            <Button onClick={createNewAlbum}>Save</Button>
            <Button onClick={cancel}>Cancel</Button>

        </div>
    );
};