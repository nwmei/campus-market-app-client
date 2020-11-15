import React from 'react';
import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from './controls/Button';
import Grid from '@material-ui/core/Grid';
import RadioGroupControl from './controls/RadioGroup';
import { sessionContext } from './SessionContext';
import locations from './constants';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '15%',
    position:"fixed"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function Filters() {
  const {value, setContextLoggedIn, setContextLoggedOut} = useContext(sessionContext);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion >
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
    </div>
  );
}
