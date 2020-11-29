import React from 'react';
import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import RadioGroupControl from '../controls/RadioGroup';
import { sessionContext } from '../SessionContext';
import locations from '../constants';
import Input from "../controls/Input";

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

const PriceFilter = () => {
    const {sessionContextValue, setSessionContext, clearSessionContext} = useContext(sessionContext);
    const classes = useStyles();

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Price</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container>
                    <Grid item xs={12}>
                        <Input label="min" margin="dense" />
                        <Input label="max" margin="dense" />
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
};

export default PriceFilter;
