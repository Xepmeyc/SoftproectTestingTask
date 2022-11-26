import React, {useEffect} from 'react';
import {useAppDispatch} from "../hooks/useAppDispatch";
import {loadAlbums} from "../store/actionCreators/albums";
import {useAppSelector} from "../hooks/useAppSelector";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import {Grid} from "@mui/material";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import {NavLink, Outlet, useParams} from "react-router-dom";
import {Album} from "../components/Album/Album";
import Button from "@mui/material/Button";


export const AlbumsPage = () => {
    const dispatch = useAppDispatch();
    const {albums,loading,error} = useAppSelector(state => state.albums);
    const {albumId} = useParams();

    useEffect(() => {
        dispatch(loadAlbums());
    }, []);

    if (loading){
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        );
    }

    if (error){
        return (<Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {error}
                </Alert>)
    }


     return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <NavLink to="create">
                <Button>Add new empty album</Button>
            </NavLink>
            {
                albumId? null : <Outlet/>
            }

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