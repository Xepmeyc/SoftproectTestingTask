import React, {useEffect} from 'react';
import {useAppDispatch} from "../hooks/useAppDispatch";
import {loadAlbums} from "../store/actionCreators/albums";
import {useAppSelector} from "../hooks/useAppSelector";
import {Grid} from "@mui/material";
import Box from "@mui/material/Box";
import {NavLink} from "react-router-dom";
import {Album} from "../components/Album/Album";
import Button from "@mui/material/Button";
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