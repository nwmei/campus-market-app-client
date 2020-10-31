import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    display: 'flex',
    maxWidth: 345,
    //width: 305,
    //height: 380,
    backgroundColor: '#e0e0e0',
    '&:hover': {
      //backgroundColor: 'green',
  }
  },
  addButton: {
    color: 'white',
    fontSize: 200
  }
}));

export default function AddCard() {
  const classes = useStyles();

  return (
    <Button className={classes.root} >
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <AddIcon className={classes.addButton} /> 
        </Grid>
        <Grid item>
          Add Item
        </Grid>
      </Grid>
    </Button>
  );
}