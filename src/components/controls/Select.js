import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';

export default function Select(props) {

    const { name, label, value, error, onChange, options, helperText } = props;

    return (
        <FormControl variant="standard">
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                error={error}
                label={label}
                name={name}
                value={value}
                onChange={onChange}>
                {
                    options.map(
                        item => (<MenuItem key={item.id} value={item.title}>{item.title}</MenuItem>)
                    )
                }
            </MuiSelect>
          {
            error &&
            <FormHelperText>{helperText}</FormHelperText>
          }
        </FormControl>
    )
}