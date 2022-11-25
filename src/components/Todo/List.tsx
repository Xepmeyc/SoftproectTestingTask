import React, {FC} from "react";
import {
    Droppable,
    DroppableProvided,
} from "react-beautiful-dnd";

interface ListProps {
    children?: React.ReactNode;
    title: string;
    onDragEnd: (data: any) => void;
    name: string;
};

const List:FC<ListProps> = ({ children, title, name }) => {
    return (
        <div className="flex flex-col">
            <h2>{title}</h2>
            <div>
                <Droppable droppableId={name}>
                    {(provided: DroppableProvided) => (
                        <div ref={provided.innerRef} className="h-screen">
                            <div className="flex flex-col h-screen">
                                {children}
                                {provided.placeholder}
                            </div>
                        </div>
                    )}
                </Droppable>
            </div>
        </div>
    );
};

export default List;