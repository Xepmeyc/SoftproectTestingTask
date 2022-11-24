import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {FC} from "react";
import {IComment} from "../../types/types";
import Button from "@mui/material/Button";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {deleteComment} from "../../store/actionCreators/comments";
import {useAppSelector} from "../../hooks/useAppSelector";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export const Comment: FC<{comment: IComment}> = ({comment}) => {
    const dispatch = useAppDispatch();
    const {loading,error} = useAppSelector(state => state.comments);

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

    const commentDelete = () => {
        dispatch(deleteComment(comment.id));
    }
    return (
        <Card className="comment" sx={{ maxWidth: 345 }}>
            <CardHeader
                title={comment.name}
                subheader={comment.email}
            />

            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {comment.body}
                </Typography>
            </CardContent>

            <Button onClick={commentDelete} size="small">Delete</Button>
        </Card>
    );
}