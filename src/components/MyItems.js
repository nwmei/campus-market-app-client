import React from "react";
import "./styles.css";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {useContext, useEffect, useState} from 'react';
import { sessionContext } from './SessionContext';
import "./styles.css";
import Header from './Header';
import {useQuery} from "@apollo/client";
import { useHistory } from "react-router-dom";
import SessionUserDetails from "../queries/SessionUserDetails.graphql";
import { PopulateSessionContext } from '../utils/HelperMethods';

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
    paddingTop: "70px",
    flexGrow:1
  }
});

export default function CardGrid() {
  const classes = useStyles();
  const [userContextSet, setUserContextSet] = useState(false);
  const {sessionContextValue, setSessionContext, clearSessionContext} = useContext(sessionContext);
  const history = useHistory();

  const {data: sessionData} = useQuery(SessionUserDetails, {
    variables: {
      input: {
        accessToken: localStorage.getItem('accessToken')
      }
    }
  });

  useEffect(()=> PopulateSessionContext(sessionData, setSessionContext, setUserContextSet, history), [sessionData]);

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
