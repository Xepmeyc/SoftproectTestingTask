import * as React from 'react';
import {FC} from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {deleteComment} from "../../store/actionCreators/comments";
import {LoadingBar} from "../LoadingBar/LoadingBar";
import {ShowError} from "../ShowError/ShowError";
import CardActions from "@mui/material/CardActions";
import {IComment} from "../../types/types";

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

            <CardActions className="panelButton">
                <Button color="error" onClick={commentDelete} size="small">Delete <DeleteForeverIcon fontSize="small"/></Button>
            </CardActions>
        </Card>
    );
}