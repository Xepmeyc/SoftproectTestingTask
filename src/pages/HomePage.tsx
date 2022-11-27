import React from 'react';
import Typography from "@mui/material/Typography";
import {CardActionArea} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";

export const HomePage = () => {
    return (
        <div className="home">
            <Card>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h3" component="div">
                            Softproect testing task
                        </Typography>
                        <Typography variant="h5" color="text.secondary">
                            The task was completed by Kirill Begletsov in order to enter the internship at the Softproject company.
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            <p>Technologies used:</p>
                            <ul>
                                <li>
                                    ReactJS
                                </li>
                                <li>
                                    Redux-toolkit
                                </li>
                                <li>
                                    Material UI
                                </li>
                                <li>
                                    React-router v6
                                </li>
                                <li>
                                    Axios
                                </li>

                            </ul>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

        </div>
    );
};