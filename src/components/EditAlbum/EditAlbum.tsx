import React, {useState} from 'react';
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useNavigate, useParams} from "react-router-dom";
import {changeAlbum, deleteAlbum} from "../../store/actionCreators/albums";
import {useAppSelector} from "../../hooks/useAppSelector";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export const EditAlbum = () => {
    const dispatch = useAppDispatch();
    const {albumId} = useParams();
    const {albums} = useAppSelector(state => state.albums);
    const album = albums.find(album => album.id.toString() === albumId);
    const navigate = useNavigate();

    if (!album){
        return (<Alert severity="error">
            <AlertTitle>Album is not exist</AlertTitle>
        </Alert>)
    }

    const [albumTitle, setAlbumTitle] = useState(album.title);


    const editHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAlbumTitle(event.target.value);
    }

    const save = () => {
        dispatch(changeAlbum({...album, title: albumTitle}));
        navigate("/albums");
    }

    return (
        <span>
            <TextField value={albumTitle} onChange={editHandle} id="outlined-basic" label="Outlined" variant="outlined" />
            <Button onClick={save}>save</Button>
        </span>
    );
};