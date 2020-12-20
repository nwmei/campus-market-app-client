import { useQuery} from "@apollo/client";
import CardGrid from './CardGrid';
import Grid from '@material-ui/core/Grid';
import Filters from './Filters';
import React, {useContext, useEffect, useState} from 'react';
import { sessionContext } from './SessionContext';
import { useHistory } from "react-router-dom";
import SessionUserDetails from '../queries/SessionUserDetails.graphql';
import { PopulateSessionContext } from '../utils/HelperMethods';
import ExplorePageStyles from './styles/ExplorePageStyles';
import Button from "./controls/Button";

const ExplorePage = ({accessToken}) => {
  const classes = ExplorePageStyles();
  const [helperFunctionDone, setHelperFunctionDone] = useState(false);
  const [userContextSet, setUserContextSet] = useState(false);
  const {sessionContextValue, setSessionContext, clearSessionContext} = useContext(sessionContext);
  const history = useHistory();

  const {loading, data: sessionData} = useQuery(SessionUserDetails, { variables: { input: { accessToken } }});

  useEffect(()=> PopulateSessionContext(sessionData, setSessionContext, setUserContextSet, history, setHelperFunctionDone), [sessionData]);

  if (loading || !helperFunctionDone) {
    return <></>
  } else if (userContextSet) {
    return (
        <div>
          <Grid container spacing={3} className={classes.root}>
            <Grid item xs={12} sm={2} style={{marginBottom: 80}}>
              <Filters />
            </Grid>
            <Grid item xs={12} sm={10}>
              <CardGrid />
            </Grid>
          </Grid>
        </div>
    )
  } else {
    return (
        <div>
          <p>You can't access this without logging in!</p>
          <Button text="go to login page" onClick={() => history.push("/login")} color="inherit"/>
        </div>
    )
  }
};

export default ExplorePage;
