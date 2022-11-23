import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {FC} from "react";
import {IComment} from "../../types/types";

export const Comment: FC<{comment: IComment}> = ({comment}) => {

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

        </Card>
    );
}