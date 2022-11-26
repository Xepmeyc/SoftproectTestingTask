import React, {FC, useState} from 'react';
import {Grid} from "@mui/material";
import {NavLink, Outlet, useNavigate, useParams} from "react-router-dom";
import {IAlbum} from "../../types/types";
import Button from "@mui/material/Button";
import {useDispatch} from "react-redux";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {changeAlbum, deleteAlbum} from "../../store/actionCreators/albums";

export const Album:FC<{album: IAlbum}> = ({album}) => {
    const dispatch = useAppDispatch();
    const {albumId} = useParams();

    const albumDelete = () => {
        dispatch(deleteAlbum(album.id));
    }


    return (
        <Grid key={album.id} item {...{ xs: 12, sm: 6, md: 4, lg: 3 }} minHeight={160}>
            <NavLink to={`edit/${album.id.toString()}`}>
                <Button> Edit</Button>
            </NavLink>

            {albumId === album.id.toString()
                ?<Outlet/>
                : null
            }
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