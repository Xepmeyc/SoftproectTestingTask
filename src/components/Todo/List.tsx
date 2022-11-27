import React, {FC} from "react";
import {
    Droppable,
    DroppableProvided,
} from "react-beautiful-dnd";
import Card from "@mui/material/Card";

interface ListProps {
    children?: React.ReactNode;
    title: string;
    onDragEnd: (data: any) => void;
    name: string;
};

export const List:FC<ListProps> = ({ children, title, name }) => {
    return (
        <div>
            <h2>{title}</h2>
            <Card sx={{ maxWidth: 450 }}>
                <div className={name === "completed"? "completedList": "noCompletedList"}>
                    <Droppable droppableId={name}>
                        {(provided: DroppableProvided) => (
                            <div ref={provided.innerRef}>
                                {children}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </Card>
        </div>

    );
};