import React from 'react'
import { Button as MuiButton, makeStyles } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/purple';
import {gradientColor} from "../constants";

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(0.5)
    },
    filter: {
        width: "100%"
    },
    label: {
        textTransform: 'none'
    }
}));

const redTheme = createMuiTheme({ palette: { primary: {mainGradient: gradientColor, main: '#ff4400'}} });

export default function Button(props) {

    const { text, size, color, variant, onClick, ...other } = props;
    const classes = useStyles();

    return (
        <MuiButton
            style={{ background: redTheme.palette.primary.mainGradient }}
            variant={variant || "contained"}
            size={size || "large"}
            color={color || "primary"}
            onClick={onClick}
            {...other}
            classes={{ root: props.filterButton?classes.filter: classes.root, label: classes.label }}>
            {text}
        </MuiButton>
    )
}