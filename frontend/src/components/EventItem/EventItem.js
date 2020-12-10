import React from 'react';
import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Divider,
    IconButton,
    Typography,
    makeStyles
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EventNoteIcon from "@material-ui/icons/EventNote";
import Moment from "react-moment";
import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
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
}))

const EventItem = ({
    id,
    handleChange,
    title,
    sharedUsers,
    userMail,
    datetime,
    duration,
    user,
    deleteFunc,
    expanded
}) => {
    const classes = useStyles();
    return (
        <Accordion
            expanded={expanded === id}
            onChange={handleChange}
            className={classes.accordion}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
                <Typography className={classes.heading}>
                    <EventNoteIcon fontSize='large' /> {title}
                </Typography>
                {sharedUsers.map(sharedUser => sharedUser.email === userMail &&
                    <Typography
                        key={id}
                        className={classes.secondaryHeading}
                    >
                        Событие пользователя: {user.email}
                    </Typography>)}
            </AccordionSummary>
            <AccordionDetails
                className={classes.details}
            >
                <Typography
                    variant='body1'
                    component='p'
                >
                    Дата: <Moment format='DD.MM.YYYY'>{datetime}</Moment>
                </Typography>
                <Typography
                    variant='body1'
                    component='p'
                >
                    Дедлайн: <Moment format='HH:mm'>{duration}</Moment>
                </Typography>
            </AccordionDetails>
            <Divider />
            {userMail === user.email ? <AccordionActions>
                <IconButton
                    size="medium"
                    onClick={deleteFunc}
                >
                    <DeleteIcon color="error"/>
                </IconButton>
            </AccordionActions> : null}
        </Accordion>
    );
};

EventItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    sharedUsers: PropTypes.array.isRequired,
    userMail: PropTypes.string.isRequired,
    datetime: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    deleteFunc: PropTypes.func.isRequired,
    expanded: PropTypes.any.isRequired
}

export default EventItem;