import React, {useEffect} from 'react';
import {NavLink} from "react-router-dom";
import {Grid} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useAppDispatch} from "../hooks/useAppDispatch";
import {useAppSelector} from "../hooks/useAppSelector";
import {loadAlbums} from "../store/actionCreators/albums";
import {Album} from "../components/Album/Album";
import {LoadingBar} from "../components/LoadingBar/LoadingBar";
import {ShowError} from "../components/ShowError/ShowError";


export const AlbumsPage = () => {
    const dispatch = useAppDispatch();
    const {albums,loading,error} = useAppSelector(state => state.albums);

    useEffect(() => {
        dispatch(loadAlbums());
    }, []);

    if (loading) return <LoadingBar/>

    if (error) return <ShowError error={error}/>

     return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Button className="createButton" variant="contained">
                <NavLink to="create"> Add new empty album </NavLink>
            </Button>

            <Grid
                container
                spacing={2}
            >
                {albums.map((album) => (
                        <Album album={album} key={album.id}/>
                ))}
            </Grid>
        </Box>
    );
};