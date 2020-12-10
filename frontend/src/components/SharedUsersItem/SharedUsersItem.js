import React from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionActions,
    Typography,
    makeStyles,
    IconButton
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

const SharedUsersItem = ({email, deleteFunc}) => {
    const classes = useStyles();
    return (
        <Accordion className={classes.sharedAccord}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className={classes.heading}>{email}</Typography>
            </AccordionSummary>
            <AccordionActions>
                <IconButton
                    size="medium"
                    onClick={deleteFunc}
                >
                    <DeleteIcon color="error"/>
                </IconButton>
            </AccordionActions>
        </Accordion>
    );
};

export default SharedUsersItem;