import React, {createContext, FC, useEffect, useState} from 'react';
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {Arrows} from "./Arrows";
import {SlidesList} from "./SlidesList";
import {Dots} from "./Dots";
import {IPhoto} from "../../types/types";
import {useAppSelector} from "../../hooks/useAppSelector";
import {loadPhotosInAlbum} from "../../store/actionCreators/photos";
import {useParams} from "react-router-dom";
import {getCurrentAlbum} from "../../store/actionCreators/albums";
import Button from "@mui/material/Button";
import {LoadingBar} from "../LoadingBar/LoadingBar";
import {ShowError} from "../ShowError/ShowError";

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
    const {currentAlbum} = useAppSelector(state => state.albums);

    const [slide, setSlide] = useState(0);

    useEffect(() => {
        if (albumId){
            dispatch(getCurrentAlbum(albumId));
            dispatch(loadPhotosInAlbum(albumId));
        }
    }, []);

    if (loading) return <LoadingBar/>

    if (error) return <ShowError error={error}/>

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
        <div className="slider">
            <Button id="basic-button">
                {currentAlbum?.title}
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