import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getEvents} from "../../store/actions/eventsActions";
import { makeStyles, Typography, List, ListItem, ListItemText, Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    title: {
        marginBottom: theme.spacing(4)
    }
}));

const Main = () => {
    const classes = useStyles();
    const {events, eventsError} = useSelector(state => state.events);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);

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
                <Grid item xs={12}>
                    <List>
                        {events && events.map(event => <ListItem
                            key={event._id}
                            button
                        >
                            <ListItemText>
                                {event.title}
                            </ListItemText>
                        </ListItem>)}
                    </List>
                </Grid>
            </Grid>
        </div>
    );
};

export default Main;