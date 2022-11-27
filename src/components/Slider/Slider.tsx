import React, {createContext, FC, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useAppSelector} from "../../hooks/useAppSelector";
import {loadPhotosInAlbum} from "../../store/actionCreators/photos";
import {getCurrentAlbum} from "../../store/actionCreators/albums";
import {Arrows} from "./Arrows";
import {SlidesList} from "./SlidesList";
import {Dots} from "./Dots";
import {LoadingBar} from "../LoadingBar/LoadingBar";
import {ShowError} from "../ShowError/ShowError";
import {IPhoto} from "../../types/types";

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

    if (loading) return <LoadingBar/>

    if (error) return <ShowError error={error}/>

    if (!photos.length){
        return <div>No photos</div>
    }



    return (
        <div className="slider">
            <div className="sliderTitle fontBold">
                {currentAlbum?.title}
            </div>
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