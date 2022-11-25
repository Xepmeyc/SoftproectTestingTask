import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {NavLink} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import {FC} from "react";

const navItems = [{
    name: "Posts",
    link: "posts"
}, {
    name: "Albums",
    link: "albums"
}, {
    name: "Todo",
    link: "todos"
}];

export const Header: FC = () => {
    return (
        <Box className="header" sx={{ display: 'flex' }}>
            <AppBar component="nav">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        <NavLink  to="/"> <HomeIcon fontSize="large" /></NavLink>
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <NavLink key={item.name} to={item.link}>
                                <Button sx={{ color: '#fff' }}>
                                    {item.name}
                                </Button>
                            </NavLink>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}