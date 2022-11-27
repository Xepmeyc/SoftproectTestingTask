import React, {FC, useState} from 'react';
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import {TextField} from "@mui/material";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {addEmptyAlbum} from "../../store/actionCreators/albums";
import {useNavigate} from "react-router-dom";
import {INewAlbum} from "../../types/types";

export const NewAlbum:FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [newAlbumTitle, setNewAlbumTitle] = useState("");


    const newAlbum: INewAlbum = {
        title: "",
        userId: Date.now()
    }

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
        <div className="newOrEditPost">
            <div className="newOrEditPostInput">
                <TextField className="newAlbumInput" onChange={changeHandle} id="outlined-basic" label="Outlined" variant="outlined" />
            </div>
            <div className="newOrEditButtonPanel">
                <Button sx = {{mr: "auto"}} onClick={createNewAlbum} variant="contained" endIcon={<SendIcon />}>
                    Create
                </Button>
                <Button sx= {{bgcolor: "error.main"}} onClick={cancel} variant="contained" >
                    Cancel
                </Button>
            </div>

        </div>
    );
};