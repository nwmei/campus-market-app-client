import { makeStyles } from '@material-ui/core/styles';
import {useMutation, useQuery} from "@apollo/client";
import CardGrid from './CardGrid';
import Grid from '@material-ui/core/Grid';
import Filters from './Filters';
import Header from './Header';
import {useContext, useEffect} from 'react';
import { useHistory, Redirect } from "react-router-dom";
import { sessionContext } from './SessionContext';
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
  const {value, setUserContext} = useContext(sessionContext);
  const history = useHistory();

  const {data: sessionData} = useQuery(SessionUserDetails, {
    variables: {
      input: {
        accessToken: localStorage.getItem('accessToken')
      }
    }
  });

  useEffect(()=> {
    if (sessionData != null) {
      const {id, firstName, lastName, emailAddress, imageUrl} = sessionData.sessionUserDetails;
      setUserContext(firstName, lastName, emailAddress, imageUrl, id);
    }
  }, [sessionData]);

  return (
    <div>
      {sessionData && sessionData.sessionUserDetails && sessionData.sessionUserDetails.id !== 'null' &&
        <>
          <Header />
          <Grid container spacing={3} className={classes.root}>
            <Grid item xs={12} sm={2} style={{marginBottom: 80}}>
              <Filters /> 
            </Grid>
            <Grid item xs={12} sm={10}>
              <CardGrid />
            </Grid>
          </Grid>
        </>
      }
      {window.localStorage.getItem('accessToken') === '' &&
        <>
          <Redirect to='/login' />
        </>
      }
    </div>
  );
}

export default ExplorePage;
