import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getEvents} from "../../store/actions/eventsActions";
import {
    makeStyles,
    Typography,
    Grid,
    IconButton,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    AccordionActions,
    Divider
} from "@material-ui/core";
import Moment from "react-moment";
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EventNoteIcon from '@material-ui/icons/EventNote';

const useStyles = makeStyles(theme => ({
    title: {
        marginBottom: theme.spacing(4)
    },
    calendarGridList: {
        width: '650px',
        margin: '0 auto',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        '& svg': {
            marginRight: '10px'
        }
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        display: 'flex',
        alignItems: 'center'
    },
    details: {
        justifyContent: 'space-around'
    },
    accordion: {
        backgroundColor: '#f5f5f5',
    }
}));

const Main = () => {
    const classes = useStyles();
    const {events, eventsError} = useSelector(state => state.events);
    const {user} = useSelector(state => state.users);
    const dispatch = useDispatch();
    const [expanded, setExpanded] = React.useState(false);


    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);


    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
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
            <Grid container >
                <Grid
                    item
                    className={classes.calendarGridList}
                >
                    {events ? events.map(event => <Accordion
                            key={event._id}
                            expanded={expanded === event._id}
                            onChange={handleChange(event._id)}
                            className={classes.accordion}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography className={classes.heading}>
                                    <EventNoteIcon fontSize='large' /> {event.title}
                                </Typography>
                                {event.sharedUsers.map(sharedUser => sharedUser.email === user.email &&
                                    <Typography
                                        key={event._id}
                                        className={classes.secondaryHeading}
                                    >
                                        Событие пользователя: {event.user.email}
                                    </Typography>)}
                            </AccordionSummary>
                            <AccordionDetails
                                className={classes.details}
                            >
                                <Typography
                                    variant='body1'
                                    component='p'
                                >
                                    Дата: <Moment format='DD.MM.YYYY'>{event.datetime}</Moment>
                                </Typography>
                                <Typography
                                    variant='body1'
                                    component='p'
                                >
                                    Дедлайн: {event.duration}
                                </Typography>
                            </AccordionDetails>
                            <Divider />
                            {user.email === event.user.email ? <AccordionActions>
                                <IconButton size="medium">
                                    <DeleteIcon/>
                                </IconButton>
                            </AccordionActions> : null}
                        </Accordion>
                    ) : <p style={{textAlign: 'center'}}>{eventsError}</p>}
                </Grid>
            </Grid>
        </div>
    );
};

export default Main;