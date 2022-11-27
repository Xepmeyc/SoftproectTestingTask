import {store} from "../index";
import {instance} from "../../api";
import {todosSlice} from "../reducers/todosSlice";
import {INormalTodo} from "../../types/types";

export const loadTodos = () => {
    const {startLoading, successLoading, failLoading} = todosSlice.actions;
    return async (dispatch) => {
        try {
            const {todos} = store.getState().todos;

            if (todos.noCompleted.length && todos.completed.length){
                return
            }

            dispatch(startLoading());
            const {data} = await instance.get("/todos");
            const itemsNormal:INormalTodo = {
                noCompleted: data.filter(todo => !todo.completed),
                completed: data.filter(todo => todo.completed),
            };
            dispatch(successLoading(itemsNormal));
        }catch (error){
            dispatch(failLoading(error.message));
        }
    }
}

export const todoUpdate = (updatedTodos:INormalTodo) => {
    const {updateTodos} = todosSlice.actions;
    return (dispatch) => {
        dispatch(updateTodos(updatedTodos))
    }
}

export const todoDelete = (todo:INormalTodo, todoId: number) => {
    const {todoDeleting, failLoading} = todosSlice.actions;
    return async (dispatch) => {
        try {
            dispatch(todoDeleting(todo));
            await instance.delete(`/todos/${todoId.toString()}`);

        }catch (error) {
            dispatch(failLoading(error.message));
        }
    }
}