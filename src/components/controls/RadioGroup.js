import React from 'react'
import { FormControl, FormLabel, RadioGroup as MuiRadioGroup, FormControlLabel, Checkbox } from '@material-ui/core';

export default function RadioGroup(props) {

    const { name, label, value, onClick, items } = props;

    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <MuiRadioGroup row name={name}>
                {
                    items.map(item => (
                        <FormControlLabel
                          key={item.id}
                          value={item.title}
                          control={<Checkbox />}
                          label={item.title}
                          checked={value===item.title}
                          onClick={onClick} />
                        ))
                }
            </MuiRadioGroup>
        </FormControl>
    )
}