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
import Button from "./controls/Button";
import CircularProgress from '@material-ui/core/CircularProgress';

const MyItems = () => {
  const accessToken = localStorage.getItem('accessToken');
  const classes = myItemsStyles();
  const [helperFunctionDone, setHelperFunctionDone] = useState(false);
  const [userContextSet, setUserContextSet] = useState(false);
  const {sessionContextValue, setSessionContext, clearSessionContext} = useContext(sessionContext);
  const history = useHistory();

  const {data: sessionData, loading} = useQuery(SessionUserDetails, { variables: { input: { accessToken } }});

  useEffect(()=> PopulateSessionContext(sessionData, setSessionContext, setUserContextSet, history, setHelperFunctionDone), [sessionData]);

  if (userContextSet) {
    return (
        <div>
          <Header />
          <Grid container
                spacing={4}
                className={classes.gridContainer}
                justify="center"
          >
            <Grid item>
              My items
            </Grid>
          </Grid>
        </div>
    )
  } else if (loading || !helperFunctionDone) {
    return (<CircularProgress />)
  } else {
    return (
        <div>
          <p>You can't access this without logging in!</p>
          <Button text="go to login page" onClick={() => history.push("/login")} color="inherit"/>
        </div>
    )
  }



  // else {
  //   return (
  //       <>
  //         {
  //           userContextSet?
  //
  //               :

  //         }
  //
  //       </>
  //   );
  // }


}

export default MyItems;
