import React, {useEffect} from 'react';
import {useAppDispatch} from "../hooks/useAppDispatch";
import {loadAlbums} from "../store/actionCreators/albums";
import {useAppSelector} from "../hooks/useAppSelector";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import {Grid} from "@mui/material";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import {NavLink} from "react-router-dom";


export const AlbumsPage = () => {
    const dispatch = useAppDispatch();
    const {albums,loading,error} = useAppSelector(state => state.albums)

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
            <Grid
                container
                spacing={2}
            >
                {albums.map((album) => (
                        <Grid key={album.id} item {...{ xs: 12, sm: 6, md: 4, lg: 3 }} minHeight={160}>
                            <NavLink className="navLink" to={`/albums/${album.id.toString()}`}>
                                <div
                                    style={
                                        {
                                            backgroundColor: '#' + (Math.random().toString(16) + '000000').substring(2,8).toUpperCase()
                                        }
                                    }
                                     className="album"
                                >
                                    {album.title}
                                </div>
                            </NavLink>
                        </Grid>
                ))}
            </Grid>
        </Box>
    );
};