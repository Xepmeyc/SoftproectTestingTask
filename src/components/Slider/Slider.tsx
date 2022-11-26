import React, {createContext, FC, useEffect, useState} from 'react';
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {Arrows} from "./Arrows";
import {SlidesList} from "./SlidesList";
import {Dots} from "./Dots";
import {IPhoto} from "../../types/types";
import {useAppSelector} from "../../hooks/useAppSelector";
import {loadPhotosInAlbum} from "../../store/actionCreators/photos";
import {useParams} from "react-router-dom";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import {loadAlbums} from "../../store/actionCreators/albums";
import Button from "@mui/material/Button";

interface ISliderContext{
    goToSlide: (number: number) => void
    changeSlide: (direction: number) => void
    slidesCount: number
    slideNumber: number
    photos: Array<IPhoto>
}

const initialContext: ISliderContext = {
    goToSlide: (number: number) => number,
    changeSlide: (direction: number) => direction,
    slidesCount: 0,
    photos:[],
    slideNumber: 0
}

export const SliderContext = createContext<ISliderContext>(initialContext);

export const Slider:FC = () => {
    const dispatch = useAppDispatch();
    const {photos,loading,error} = useAppSelector(state => state.photos);
    const {albumId} = useParams();
    const {albums} = useAppSelector(state => state.albums)
    const album = albums.find(album => album.id.toString() === albumId);

    const [slide, setSlide] = useState(0);

    useEffect(() => {
        if (albumId){
            dispatch(loadAlbums());
            dispatch(loadPhotosInAlbum(albumId));
        }
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

    if (!photos.length){
        return <div>No photos</div>
    }


    const changeSlide = (direction = 1) => {
        let slideNumber = 0;

        if (slide + direction < 0) {
            slideNumber = photos.length - 1;
        } else {
            slideNumber = (slide + direction) % photos.length;
        }

        setSlide(slideNumber);
    };

    const goToSlide = (number:number) => {
        setSlide(number % photos.length);
    };


    return (
        <div
            className="slider"
        >
            <Button
                id="basic-button"
            >
                {album?.title}
            </Button>
            <SliderContext.Provider
                value={{
                    goToSlide,
                    changeSlide,
                    slidesCount: photos.length,
                    slideNumber: slide,
                    photos,
                }}
            >
                <Arrows />
                <SlidesList />
                <Dots />
            </SliderContext.Provider>
        </div>
    );
};