import {createSlice} from "@reduxjs/toolkit";
import {INormalTodo} from "../../types/types";

interface TodoState {
    todos: INormalTodo
    loading: boolean
    error: null | string
}

const initialState: TodoState = {
    todos: {completed: [], noCompleted: []},
    loading: true,
    error: null
}

export const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        startLoading: () => ({
            ...initialState,
            loading: true
        }),
        successLoading: (state, action) => {
            state.todos = action.payload;
            state.loading = false;
            console.log("Todos loading")
        },
        failLoading: (state,action) => {
            state.error = action.payload;
            state.loading = false;
        },
        changeCompleteStatus: (state, action) => ({
            ...state,
            ...action.payload,
            loading: false
        }),
        updateTodos: (state, {payload}) => {
            state.todos = payload;
        }
    },
})