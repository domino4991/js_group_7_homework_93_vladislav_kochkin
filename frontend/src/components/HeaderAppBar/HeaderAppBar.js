import React from 'react';
import { makeStyles, AppBar, Toolbar, Typography } from "@material-ui/core";
import {useSelector} from "react-redux";
import AnonMenu from "../UI/AnonMenu";
import UserMenu from "../UI/UserMenu/UserMenu";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing(3)
    },
    title: {
        flexGrow: 1,
    },
}));

const HeaderAppBar = () => {
    const classes = useStyles();
    const {user} = useSelector(state => state.users);
    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    Events Calendar
                </Typography>
                {!user ?
                    <AnonMenu />
                    :
                    <UserMenu />
                }
            </Toolbar>
        </AppBar>
    );
};

export default HeaderAppBar;