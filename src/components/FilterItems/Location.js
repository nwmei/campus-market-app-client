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

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

const LocationFilter = () => {
    const {sessionContextValue, setSessionContext, clearSessionContext} = useContext(sessionContext);
    console.log(sessionContextValue.school);
    const classes = useStyles();

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Location</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container>
                    <Grid item xs={12}>
                        <RadioGroupControl
                            name="location"
                            value=""
                            onChange={() => console.log(2)}
                            items={locations["bu"]}
                        />
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
};

export default LocationFilter;
