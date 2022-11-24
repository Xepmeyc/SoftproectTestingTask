import React, {FC, useContext} from 'react';
import {SliderContext} from "./Slider";
import {Slide} from "./Slide"

export const SlidesList:FC = () => {
    const { slideNumber, photos } = useContext(SliderContext);

    return (
        <div
            className="slide-list"
            style={{ transform: `translateX(-${slideNumber * 100}%)` }}
        >
            {photos.map((slide, index) => (
                <Slide key={index} slide={slide} />
            ))}
        </div>
    );
};