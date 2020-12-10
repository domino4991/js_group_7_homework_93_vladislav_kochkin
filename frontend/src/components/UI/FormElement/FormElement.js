import React from 'react';
import {TextField, Grid, makeStyles} from "@material-ui/core";
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    gridItem: {
        marginBottom: theme.spacing(3)
    }
}));

const FormElement = ({
    type,
    name,
    value,
    changed,
    error,
    label,
    classNameInput,
    id
 }) => {
    const classes = useStyles();
    return (
        <Grid item xs={12} className={classNameInput ? classNameInput : classes.gridItem}>
            <TextField
                fullWidth
                type={type}
                name={name}
                value={value}
                onChange={changed}
                error={!!error}
                helperText={error}
                label={label}
                variant='outlined'
                id={id}
                required
            />
        </Grid>
    );
};

FormElement.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    changed: PropTypes.func.isRequired
}

export default FormElement;