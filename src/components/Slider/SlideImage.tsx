import React, {FC} from 'react';

export const SlideImage:FC<{src: string, alt: string}> = ({src, alt}) => {
    return <img src={src} alt={alt} className="slideImage" />;
};