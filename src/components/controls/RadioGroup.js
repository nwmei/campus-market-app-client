import React from 'react'
import { FormControl, FormLabel, RadioGroup as MuiRadioGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: 14,
  },
}));

export default function RadioGroup(props) {

    const classes = useStyles();

    const { component, name, label, value, onClick, items } = props;

    const determineClickHandler = (item) => {
      if (component === 'addItem') {
        return (() => onClick(item.title))
      } else {
        return onClick;
      }
    };

    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <MuiRadioGroup name={name}>
                {
                    items.map(item => (
                        <FormControlLabel
                          key={item.id}
                          value={item.title}
                          control={<Checkbox />}
                          label={<Typography className={classes.root}>{item.title}</Typography>}
                          checked={value===item.title}
                          onClick={determineClickHandler(item)} />
                        ))
                }
            </MuiRadioGroup>
        </FormControl>
    )
}