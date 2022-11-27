import React, {useEffect} from 'react';
import {useAppDispatch} from "../hooks/useAppDispatch";
import {loadTodos} from "../store/actionCreators/todos";
import {Todos} from "../components/Todo/Todos";
import {useAppSelector} from "../hooks/useAppSelector";
import {LoadingBar} from "../components/LoadingBar/LoadingBar";
import {ShowError} from "../components/ShowError/ShowError";

export const TodoPage = () => {
    const dispatch = useAppDispatch();
    const {todos,loading,error} = useAppSelector(state => state.todos);

    useEffect(() => {
        dispatch(loadTodos());
    }, []);

    if (loading) return <LoadingBar/>

    if (error) return <ShowError error={error}/>

    return (
        <div className="flex flexCol items-center bg-gray-100 min-h-screen">
            <Todos todos={todos}/>
        </div>
    );
};