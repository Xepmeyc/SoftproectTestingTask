import React, {FC} from "react";
import {ITodo} from "../../types/types";

const Card:FC<{data: ITodo}> = ({ data }) => {
    return (
        <div className="shadow-lg flex w-full cursor-pointer">
            <main className="py-7 px-5 rounded-r-md w-full bg-white">
                <span className="flex flex-row justify-between">
                    <h4 className="uppercase font-normal">{data.title}</h4>
                </span>
            </main>
        </div>
    );
};

export default Card;