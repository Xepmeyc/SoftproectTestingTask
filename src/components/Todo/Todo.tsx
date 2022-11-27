import React, {FC} from "react";
import {ITodo} from "../../types/types";
import {Chip} from "@mui/material";

export const Todo:FC<{listName: string,data: ITodo,handleDelete:() => void}> = ({listName, data,handleDelete }) => {

    return (
        <div className="todo">
            {listName === "noCompleted"
                ? <Chip className="draggableItem"
                    label={data.title}
                    onDelete={handleDelete}
                />
                : <Chip className="draggableItem"
                    label={data.title}
                    variant="outlined"
                    onDelete={handleDelete}
                />
            }
        </div>
    );
};