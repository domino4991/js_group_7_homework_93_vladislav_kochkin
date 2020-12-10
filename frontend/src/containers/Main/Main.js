import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteEvent, deleteSharedUser, getEvents, postEvent} from "../../store/actions/eventsActions";
import {
    makeStyles,
    Typography,
    Grid,
    Drawer,
    Button,
    MenuItem,
    TextField
} from "@material-ui/core";
import {
    MuiPickersUtilsProvider,
    DatePicker,
    TimePicker
} from '@material-ui/pickers';
import EventItem from "../../components/EventItem/EventItem";
import FormElement from "../../components/UI/FormElement/FormElement";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import 'moment/locale/ru';
import SharedUsersItem from "../../components/SharedUsersItem/SharedUsersItem";
import {addSharedUser, getUsers} from "../../store/actions/usersActions";

moment.locale("ru");

const useStyles = makeStyles(theme => ({
    title: {
        marginBottom: theme.spacing(4)
    },
    calendarGridList: {
        width: '650px',
        margin: '0 auto',
    },
    drawer: {
        padding: theme.spacing(2),
        width: '250px'
    },
    drawerTitle: {
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(3),
        '&:first-child': {
            marginTop: '0'
        }
    },
    datesPickers: {
        marginBottom: theme.spacing(3)
    },
    selectInp: {
        marginBottom: theme.spacing(3)
    },
    toggleBtn: {
        display: 'block',
        margin: '0 auto 30px'
    },
    sharedAccord: {
        marginBottom: '100px'
    }
}));

const Main = () => {
    const classes = useStyles();
    const {events, eventsError} = useSelector(state => state.events);
    const {user, users} = useSelector(state => state.users);
    const dispatch = useDispatch();
    const [expanded, setExpanded] = useState(false);
    const [pickDate, setPickDate] = useState(new Date());
    const [pickTime, setPickTime] = useState(new Date());

    const [state, setState] = useState({
        right: false,
    });

    const [newEvent, setNewEvent] = useState({
        title: '',
        datetime: new Date().toISOString(),
        duration: new Date().toISOString()
    });

    const [sharedUserEmail, setSharedUserEmail] = useState({
        email: ''
    });

    const onChangeUserEmail = e => {
        const name = e.target.name;
        const value = e.target.value;
        setSharedUserEmail(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onSubmitSharedUser = e => {
        e.preventDefault();
        if(sharedUserEmail.email !== '') {
            dispatch(addSharedUser(sharedUserEmail.email));
            setSharedUserEmail(prevState => ({
                ...prevState,
                email: ''
            }));
        }
    }

    useEffect(() => {
        dispatch(getEvents());
        dispatch(getUsers());
    }, [dispatch]);


    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const onChangeField = e => {
        const name = e.target.name;
        const value = e.target.value;
        setNewEvent(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDateChange = date => {
        setPickDate(date);
        setNewEvent(prevState => ({
            ...prevState,
                datetime: new Date(date).toISOString()
        }));
    }

    const handleTimeChange = time => {
        setPickTime(time);
        setNewEvent(prevState => ({
            ...prevState,
            duration: new Date(time).toISOString()
        }));
    }

    const getFieldError = fieldName => {
        try {
            return eventsError.errors[fieldName].message;
        } catch (e) {
            return null;
        }
    };

    const onSubmittedForm = e => {
        e.preventDefault();
        dispatch(postEvent({...newEvent}));
        setNewEvent({
            title: '',
            datetime: '',
            duration: ''
        });
    };

    return (
        <div>
            <Typography
                variant='h5'
                component='h5'
                align='center'
                className={classes.title}
            >
                Календарь событий
            </Typography>
            <Button
                onClick={toggleDrawer('right', true)}
                className={classes.toggleBtn}
                color='primary'
                variant='contained'
            >
                Добавить событие
            </Button>
            <Grid container >
                <Grid
                    item
                    className={classes.calendarGridList}
                >
                    {eventsError && <p style={{textAlign: 'center'}}>{eventsError}</p>}
                    {events && events.map(item => item.events.map(event => <EventItem
                        key={event._id}
                        user={item.user}
                        duration={event.duration}
                        id={event._id}
                        sharedUsers={item.sharedUsers}
                        handleChange={handleChange(event._id)}
                        expanded={expanded}
                        title={event.title}
                        datetime={event.datetime}
                        userMail={user.email}
                        deleteFunc={() => dispatch(deleteEvent(event._id))}
                    />)
                    )}
                </Grid>
            </Grid>
            <Drawer
                anchor='right'
                open={state.right}
                onClose={toggleDrawer('right', false)}
                classes={{
                    paper: classes.drawer
                }}
            >
                <Typography
                    className={classes.drawerTitle}
                >Добавить новое событие</Typography>
                <form
                    autoComplete='off'
                    onSubmit={e => onSubmittedForm(e)}
                    className={classes.formNewEvent}
                >
                    <FormElement
                        label='Название события'
                        changed={e => onChangeField(e)}
                        value={newEvent.title}
                        error={getFieldError('title')}
                        name='title'
                        type='text'
                    />
                    <MuiPickersUtilsProvider
                        libInstance={moment}
                        utils={MomentUtils}
                        locale="ru">
                        <Grid container justify="space-around">
                            <DatePicker
                                label="Дата"
                                format='DD MMM yyyy'
                                value={pickDate}
                                autoOk
                                inputVariant='outlined'
                                onChange={handleDateChange}
                                helperText={getFieldError('datetime')}
                                fullWidth
                                disablePast={true}
                                className={classes.datesPickers}
                            />
                            <TimePicker
                                label="Дедлайн"
                                value={pickTime}
                                ampm={false}
                                autoOk
                                onChange={handleTimeChange}
                                inputVariant='outlined'
                                fullWidth
                                helperText={getFieldError('duration')}
                                className={classes.datesPickers}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <Button
                        fullWidth
                        variant='contained'
                        color='primary'
                        type='submit'
                    >
                        Создать
                    </Button>
                </form>
                <Typography
                    className={classes.drawerTitle}
                >Добавить пользователя</Typography>
                <form
                    onSubmit={e => onSubmitSharedUser(e)}
                >
                    <TextField
                        fullWidth
                        select
                        name='email'
                        value={sharedUserEmail.email}
                        label='Пользователи'
                        variant='outlined'
                        onChange={e => onChangeUserEmail(e)}
                        className={classes.selectInp}
                        required
                    >
                        <MenuItem
                            value=''
                            disabled
                            selected
                        >
                            Выберите пользователя
                        </MenuItem>
                        {users ? users.map(item => item.email !== user.email && <MenuItem
                            key={item.email}
                            value={item.email}
                        >
                            {item.email}
                        </MenuItem>) : <MenuItem value='' disabled selected>Список пуст</MenuItem>}
                    </TextField>
                    <Button
                        fullWidth
                        color='primary'
                        variant='contained'
                        type='submit'
                    >
                        Добавить
                    </Button>
                </form>
                <Typography
                    className={classes.drawerTitle}
                >С кем поделились</Typography>
                <div className={classes.sharedAccord}>
                    {events && events
                        .map(item => item.user.email === user.email && item.sharedUsers.map(item =>
                            <SharedUsersItem
                                key={item.email}
                                email={item.email}
                                deleteFunc={() => dispatch(deleteSharedUser(item.email))}
                            />))}
                </div>
            </Drawer>
        </div>
    );
};

export default Main;