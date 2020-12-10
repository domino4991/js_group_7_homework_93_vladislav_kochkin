import React from 'react';
import {Typography, Button, makeStyles} from "@material-ui/core";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles(() => ({
    enterBtn: {
        marginTop: '30px',
        textAlign: 'center'
    }
}))

const PlugPage = () => {
    const classes = useStyles();
    const {user} = useSelector(state => state.users);
    return (
        <>
            <Typography variant='h5' component='h5' align='center'>
                Чтобы войти в свой календарь событий Вам нужно зарегистрироваться или выполнить вход в систему
            </Typography>
            {user && <div className={classes.enterBtn}>
                <Button
                    component={NavLink}
                    to='/calendar'
                    exact
                    color='primary'
                    variant='contained'
                >Войти в календарь</Button>
            </div>}
        </>
    );
};

export default PlugPage;