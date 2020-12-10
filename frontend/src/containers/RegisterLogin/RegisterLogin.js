import React, {useEffect, useState} from 'react';
import {
    Typography,
    CssBaseline,
    Container,
    Grid,
    Button,
    makeStyles
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {cleanUserError, loginUser, registerUser} from "../../store/actions/usersActions";
import FormElement from "../../components/UI/FormElement/FormElement";
import FacebookLogin from "../../components/FacebookLogin/FacebookLogin";

const useStyles = makeStyles(theme => ({
    form: {
        width: '300px',
        margin: '0 auto'
    },
    title: {
        marginBottom: theme.spacing(4)

    },
    facebookText: {
        margin: '20px 0'
    }
}));

const RegisterLogin = props => {
    const classes = useStyles();
    const {usersError} = useSelector(state => state.users);
    const dispatch = useDispatch();
    const url = props.match.url;
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        dispatch(cleanUserError());
    }, [dispatch, url]);

    const onChangeField = e => {
        const name = e.target.name;
        const value = e.target.value;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const getFieldError = fieldName => {
        try {
            return usersError.errors[fieldName].message;
        } catch (e) {
            return null;
        }
    };

    const onSubmittedForm = e => {
        e.preventDefault();
        if(url === '/register') {
            dispatch(registerUser({ ...user }));
        } else if(url === '/login') {
            dispatch(loginUser({ ...user }));
        }
        setUser({
            username: '',
            password: '',
            email: ''
        });
    };

    return (
        <>
            <CssBaseline />
            <Container>
                <Grid container direction='column'>
                    <Typography
                        variant='h5'
                        component='h5'
                        align='center'
                        className={classes.title}
                    >
                        {url === '/register' ? 'Регистрация' : 'Вход'}
                    </Typography>
                    <form
                        className={classes.form}
                        onSubmit={e => onSubmittedForm(e)}
                    >
                        <FormElement
                            label='Логин'
                            error={getFieldError('username')}
                            changed={e => onChangeField(e)}
                            value={user.username}
                            name='username'
                            type='text'
                        />
                        <FormElement
                            label='E-mail'
                            error={getFieldError('email')}
                            changed={e => onChangeField(e)}
                            value={user.email}
                            name='email'
                            type='text'
                        />
                        <FormElement
                            label='Пароль'
                            error={getFieldError('password')}
                            changed={e => onChangeField(e)}
                            value={user.password}
                            name='password'
                            type='password'
                        />
                        <Button
                            variant='contained'
                            type='submit'
                            fullWidth
                            color='primary'
                        >
                            {url === '/register' ? 'Регистрация' : 'Вход'}
                        </Button>
                        <Typography
                            variant='body1'
                            component='p'
                            align='center'
                            className={classes.facebookText}
                        >
                            Or sign in with facebook
                        </Typography>
                        <FacebookLogin btnLabel='Войти с помощью Facebook' />
                    </form>
                </Grid>
            </Container>
        </>
    );
};

export default RegisterLogin;