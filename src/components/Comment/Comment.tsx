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
import {LoadingBar} from "../LoadingBar/LoadingBar";
import {ShowError} from "../ShowError/ShowError";

export const Comment: FC<{comment: IComment}> = ({comment}) => {
    const dispatch = useAppDispatch();
    const {loading,error} = useAppSelector(state => state.comments);

    if (loading) return <LoadingBar/>

    if (error) return <ShowError error={error}/>

    const commentDelete = () => {
        dispatch(deleteComment(comment.id));
    }
    return (
        <Card className="comment">
            <CardHeader className="comment_header"
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