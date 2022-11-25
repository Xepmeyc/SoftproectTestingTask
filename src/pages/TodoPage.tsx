import React, {useEffect, useMemo} from 'react';
import {useAppDispatch} from "../hooks/useAppDispatch";
import {loadTodos, todoUpdate} from "../store/actionCreators/todos";
import Todos from "../components/Todo/Todos";
import {useAppSelector} from "../hooks/useAppSelector";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
export const TodoPage = () => {
    const dispatch = useAppDispatch();
    const {todos,loading,error} = useAppSelector(state => state.todos);

    useEffect(() => {
        dispatch(loadTodos());
    }, []);


    if (loading){
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        );
    }

    if (error){
        return (<Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
        </Alert>)
    }

    return (
        <div className="flex flex-col items-center bg-gray-100 min-h-screen">
            <Todos todos={todos}/>
        </div>
    );
};