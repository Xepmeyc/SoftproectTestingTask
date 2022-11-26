import React, {FC} from 'react';
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";

export const ShowError:FC<{error: string}> = ({error}) => {
    return (
        <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
        </Alert>
    );
};