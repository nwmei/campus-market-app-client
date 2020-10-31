import React from "react";
import c from "./styles.css";
import MyCard from "./Card";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddCard from "./AddCard";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
    paddingTop: "40px"
  }
});

export default function CardGrid() {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={4}
      className={classes.gridContainer}
      justify="center"
    >
      <Grid item xs={12} sm={6} md={4}>
        <AddCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <MyCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <MyCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <MyCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <MyCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <MyCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <MyCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <MyCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <MyCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <MyCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <MyCard />
      </Grid>
    </Grid>
  );
}
