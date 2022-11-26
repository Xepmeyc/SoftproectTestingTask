import Card from "./Card";
import List from "./List";
import {
    DragDropContext,
    Draggable,
    DraggableProvided,} from "react-beautiful-dnd";
import React, {FC, useState} from "react";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {INormalTodo, ITodo} from "../../types/types";
import {todoDelete, todoUpdate} from "../../store/actionCreators/todos";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";


const Todos:FC<{todos: INormalTodo }> = ({todos}) => {
    const dispatch = useAppDispatch();

    const initialTodo:ITodo = {
        id: 0,
        title:"",
        completed: false,
        userId: 0
    }

    const [items, setItems] = useState(todos);
    const [currentTodo, setCurrentTodo] = useState(initialTodo);
    const [todoTitle, setTodoTitle] = useState("");

    const removeFromList = (list: Array<ITodo>, index: number, completedStatus: string) => {
        const status = {completed: true, noCompleted: false}
        const changedItems = list.map(item => {
            if (item.id === currentTodo.id){
                return {...item, completed: status[completedStatus]}
            }
            return  item;
        })
        const result = Array.from(changedItems);
        const [removed] = result.splice(index, 1);
        return [removed, result];
    };

    const addToList = (list: Array<ITodo>, index: number, element) => {
        const result = Array.from(list);
        result.splice(index, 0, element);
        return result;
    };

    const onDragEnd = (result) => {
        const {destination, source} = result;
        if (!destination) {
            return;
        }
        const listCopy:INormalTodo = { ...items };
        const sourceList:Array<ITodo>= listCopy[source.droppableId];

        const [removedElement, newSourceList] = removeFromList(
            sourceList,
            source.index,
            destination.droppableId
        );
        listCopy[source.droppableId] = newSourceList;

        const destinationList:Array<ITodo> = listCopy[destination.droppableId];
        listCopy[destination.droppableId] = addToList(
            destinationList,
            destination.index,
            removedElement
        );
        setItems(listCopy);
    };

    const onDragStart = ({source} ) => {
        const currentItem = items[source.droppableId][source.index];
        setCurrentTodo(currentItem);
    }

    const save = () => {
        dispatch(todoUpdate(items))
    }

    const deleteHandle = (todo: ITodo) => {
        const copyTodoList: INormalTodo = {
            ...items
        }

        copyTodoList[getStatus(todo.completed)] = todos[getStatus(todo.completed)].filter(item => item.id !== todo.id);
        dispatch(todoDelete(copyTodoList, todo.id));
        setItems(copyTodoList);
    }

    const getStatus = (completed: boolean) => {
        if (completed){
            return "completed";
        }

        return "noCompleted";
    }

    const changeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTodoTitle(event.target.value);
    }


    return (
            <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                <Button onClick={save} variant="contained" endIcon={<SendIcon />}>
                    Save
                </Button>
                <div className="flex">
                    <List title="No completed" onDragEnd={onDragEnd} name="noCompleted">
                        {items.noCompleted.map((item, index) => (
                            <Draggable onDragStart={onDragStart} key={item.id} draggableId={item.id.toString()} index={index}>
                                {(
                                    provided: DraggableProvided,
                                ) => (

                                    <div>
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <Card data={item}>
                                                <Button onClick={() => deleteHandle(item)}>Delete</Button>
                                            </Card>
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                    </List>
                    <List title="Completed" onDragEnd={onDragEnd} name="completed">
                        {items.completed.map((item, index) => (
                            <Draggable draggableId={item.id.toString()} index={index} key={item.id}>
                                {(provided: DraggableProvided,) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <Card data={item}>
                                            <Button onClick={() => deleteHandle(item)}>Delete</Button>
                                        </Card>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                    </List>
                </div>
            </DragDropContext>
    );
};

export default Todos;