import React, {FC, useState} from 'react';
import {Grid} from "@mui/material";
import {NavLink} from "react-router-dom";
import {IAlbum} from "../../types/types";
import Button from "@mui/material/Button";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {deleteAlbum} from "../../store/actionCreators/albums";

export const Album:FC<{album: IAlbum}> = ({album}) => {
    const dispatch = useAppDispatch();

    const albumDelete = () => {
        dispatch(deleteAlbum(album.id));
    }


    return (
        <Grid item {...{ xs: 12, sm: 6, md: 4, lg: 3 }} minHeight={160}>
            <Button onClick={albumDelete}>Delete</Button>


            <NavLink className="navLink" to={`/albums/${album.id.toString()}`}>
                <div
                    className="album"
                >
                    {album.title}
                </div>
            </NavLink>
        </Grid>
    );
};