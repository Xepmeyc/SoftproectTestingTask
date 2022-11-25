import {store} from "../index";
import {instance} from "../../api";
import {todosSlice} from "../reducers/todosSlice";
import {INormalTodo, ITodo} from "../../types/types";

export const loadTodos = () => {
    const {startLoading, successLoading, failLoading} = todosSlice.actions;
    return async (dispatch) => {
        try {
            const {todos} = store.getState().todos;

            if (todos.length){
                return
            }

            dispatch(startLoading());
            const {data} = await instance.get("/todos");
            /*const itemsNormal:INormalTodo = {
                noCompleted: data.filter(todo => !todo.completed),
                completed: data.filter(todo => todo.completed),
            };*/
            dispatch(successLoading(data));
        }catch (error){
            dispatch(failLoading(error.message));
        }
    }
}

export const changeComplete = (todo: ITodo) => {
    const {changeCompleteStatus} = todosSlice.actions;
    const changingTodo:ITodo = {
        ...todo,
        completed:!todo.completed
    }

    return (dispatch) => {
        dispatch(changeCompleteStatus(changingTodo))
    }
}

export const todoUpdate = (updatedTodos:INormalTodo) => {
    const {updateTodos} = todosSlice.actions;
    return (dispatch) => {
        dispatch(updateTodos(updatedTodos))
    }
}