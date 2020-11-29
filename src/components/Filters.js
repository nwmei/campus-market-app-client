import React from 'react';
import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { sessionContext } from './SessionContext';
import LocationFilter from "./FilterItems/Location";
import PriceFilter from "./FilterItems/Price";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '15%',
    position: "fixed",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  spacing: {
    marginBottom: 5
  }
}));

export default function Filters() {
  const {sessionContextValue, setSessionContext, clearSessionContext} = useContext(sessionContext);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.spacing}>
        <LocationFilter/>
      </div>
      <div className={classes.spacing}>
        <PriceFilter />
      </div>
    </div>
  );
}
