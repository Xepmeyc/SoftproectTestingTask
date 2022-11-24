import React, {FC, useContext} from 'react';
import {SliderContext} from "./Slider";

export const Arrows:FC = () => {
    const {changeSlide} = useContext(SliderContext);

    return (
        <div className="arrows">
            <div className="arrow left" onClick={() => changeSlide(-1)}>◀</div>
            <div className="arrow right" onClick={() => changeSlide(1)}>▶</div>
        </div>
    );
};