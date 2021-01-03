import React from 'react';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop:"80px",
    flexGrow:1
  },
}));


const Error = () => {
  const classes = useStyles();
  return(
    <div className={classes.root}>
      <h1>This is not a valid URL! :( </h1>
    </div>
  )
};

export default Error;
