import React, {FC, useContext} from 'react';
import {SliderContext} from "./Slider";

export const Dot:FC<{number:number}> = ({number}) => {
    const { goToSlide, slideNumber } = useContext(SliderContext);

    return (
        <div
            className={`dot ${slideNumber === number ? "selected" : ""}`}
            onClick={() => goToSlide(number)}
        />
    );
};