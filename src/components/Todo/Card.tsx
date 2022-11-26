import React, {FC} from "react";
import {ITodo} from "../../types/types";

const Card:FC<{data: ITodo, children:React.ReactNode}> = ({ data, children }) => {

    return (
        <div className="draggable_item">
            <main className="py-7 px-5 rounded-r-md w-full bg-white">
                <span className="flex flex-row justify-between">
                    <h4 className="uppercase font-normal">{data.title}</h4>
                    {children}
                </span>
            </main>
        </div>
    );
};

export default Card;