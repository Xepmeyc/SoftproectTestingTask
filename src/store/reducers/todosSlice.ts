import {createSlice} from "@reduxjs/toolkit";
import {INormalTodo, ITodo} from "../../types/types";

interface TodoState {
    todos: Array<ITodo>
    loading: boolean
    error: null | string
}

const initialState: TodoState = {
    todos: [],
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
        updateTodos: (state, action) => {
            state.todos = action.payload;
            console.log(action.payload)
        }
    },
})