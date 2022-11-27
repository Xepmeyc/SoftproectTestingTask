import React, {FC} from 'react';
import {Grid} from "@mui/material";
import {NavLink} from "react-router-dom";
import Button from "@mui/material/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {deleteAlbum} from "../../store/actionCreators/albums";
import {IAlbum} from "../../types/types";

export const Album:FC<{album: IAlbum}> = ({album}) => {
    const dispatch = useAppDispatch();

    const albumDelete = () => {
        dispatch(deleteAlbum(album.id));
    }


    return (
        <Grid sx={{mt: 2}} item {...{ xs: 12, sm: 6, md: 4, lg: 3 }} minHeight={160}>

                <div className="album">
                    <div className="albumTitle">
                        {album.title}
                    </div>
                    <div className="albumControl">
                        <NavLink className="firstButton fontBold" to = {`/albums/${album.id.toString()}`}>
                            <Button size="small">Learn More</Button>
                        </NavLink>
                        <span className="fontBold" >
                            <Button color="error" onClick={albumDelete} size="small">Delete <DeleteForeverIcon fontSize="small"/></Button>
                        </span>
                    </div>
                </div>
        </Grid>
    );
};
