import React, {FC, useContext} from 'react';
import {SliderContext} from "./Slider";
import {Dot} from "./Dot"

export const Dots:FC = () => {
    const {slidesCount} = useContext(SliderContext);

    const renderDots = () => {
        const dots: Array<React.ReactNode> = [];
        for (let i = 0; i < slidesCount; i++) {
            dots.push(<Dot key={`dot-${i}`} number={i}/>);
        }

        return dots;
    };

    return <div className="dots">{renderDots()}</div>;
};