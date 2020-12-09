import React from 'react';
import { Button } from "@material-ui/core";
import {NavLink} from "react-router-dom";

const AnonMenu = () => {
    return (
        <>
            <Button
                component={NavLink}
                to='/register'
                exact
                color='inherit'
            >
                Sign up
            </Button>
            <Button
                component={NavLink}
                to='/login'
                exact
                color='inherit'
            >
                Sign in
            </Button>
        </>
    );
};

export default AnonMenu;