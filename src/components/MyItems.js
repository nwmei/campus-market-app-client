import React from "react";
import "./styles.css";
import { Grid } from "@material-ui/core";
import {useContext, useEffect, useState} from 'react';
import { sessionContext } from './SessionContext';
import "./styles.css";
import Header from './Header';
import {useQuery} from "@apollo/client";
import { useHistory } from "react-router-dom";
import SessionUserDetails from "../queries/SessionUserDetails.graphql";
import { PopulateSessionContext } from '../utils/HelperMethods';
import myItemsStyles from "./styles/MyItemsStyles";

const MyItems = () => {
  const accessToken = localStorage.getItem('accessToken');
  const classes = myItemsStyles();
  const [userContextSet, setUserContextSet] = useState(false);
  const {sessionContextValue, setSessionContext, clearSessionContext} = useContext(sessionContext);
  const history = useHistory();

  const {data: sessionData} = useQuery(SessionUserDetails, { variables: { input: { accessToken } }});

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

export default MyItems;
