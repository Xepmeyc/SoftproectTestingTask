import React, {FC} from 'react';

export const SlideTitle:FC<{title: string}> = ({title}) => {
    return <div className="slide-title">{title}</div>;
};