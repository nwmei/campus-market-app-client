import React from "react";
import "./styles.css";
import MyCard from "./BetaCard";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./styles.css";
import Header from './Header';

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
    paddingTop: "40px",
    paddingTop:"70px", 
    flexGrow:1
  }
});

export default function CardGrid() {
  const classes = useStyles();

  return (
    <>
    <Header />
    <Grid
      container
      spacing={4}
      className={classes.gridContainer}
      justify="center"
    >
      <Grid item>
        My items
      </Grid>
    </Grid>
    </>
  );
}
