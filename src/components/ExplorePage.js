import { makeStyles } from '@material-ui/core/styles';
import {useMutation, useQuery} from "@apollo/client";
import CardGrid from './CardGrid';
import Grid from '@material-ui/core/Grid';
import Filters from './Filters';
import Header from './Header';
import {useContext, useEffect, useState} from 'react';
import { sessionContext } from './SessionContext';
import { useHistory, Redirect } from "react-router-dom";
import SessionUserDetails from '../queries/SessionUserDetails.graphql';
import StoreItems from "../queries/StoreItems.graphql";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop:"70px", 
    flexGrow:1
  },
  filter: {
    paddingBottom:"80px"
  }
}));

function ExplorePage() {
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

  useEffect(()=> {
    if (sessionData) {
      if (sessionData.sessionUserDetails != null) {
        const {id, firstName, lastName, emailAddress, imageUrl} = sessionData.sessionUserDetails;
        setSessionContext(firstName, lastName, emailAddress, imageUrl, id);
        setUserContextSet(true);
      } else {
        history.push('/login')
      }
    }
  }, [sessionData]);

  return (
      <>
      {
          userContextSet &&
          <div>
            <Header />
            <Grid container spacing={3} className={classes.root}>
              <Grid item xs={12} sm={2} style={{marginBottom: 80}}>
                <Filters />
              </Grid>
              <Grid item xs={12} sm={10}>
                <CardGrid />
              </Grid>
            </Grid>
          </div>
      }
      </>
  );
}

export default ExplorePage;
