import React, {FC} from 'react';
import {IPhoto} from "../../types/types";
import {SlideImage} from "./SlideImage";
import {SlideTitle} from "./SlideTitile";

export const Slide:FC<{slide: IPhoto}> = ({slide}) => {
    return (
        <div className="slide">
            <SlideImage src={slide.url} alt={slide.thumbnailUrl} />
            <SlideTitle title={slide.title} />
        </div>
    );
};