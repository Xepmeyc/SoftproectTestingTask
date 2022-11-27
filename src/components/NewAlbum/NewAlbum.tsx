import React, {FC, useState} from 'react';
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {INewAlbum} from "../../types/types";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {addEmptyAlbum} from "../../store/actionCreators/albums";
import SendIcon from "@mui/icons-material/Send";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

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