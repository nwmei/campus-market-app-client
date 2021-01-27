import React from 'react'
import { TextField } from '@material-ui/core';

export default function Input(props) {

    const { name, label, value, error, onChange, variant="outlined", helperText, ...other } = props;
    return (
        <TextField
            error={error}
            helperText={error? helperText: null}
            size="small"
            variant={variant}
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            {...other}
        />
    )
}