import { useQuery} from "@apollo/client";
import CardGrid from './CardGrid';
import Grid from '@material-ui/core/Grid';
import Filters from './Filters';
import Header from './Header';
import {useContext, useEffect, useState} from 'react';
import { sessionContext } from './SessionContext';
import { useHistory } from "react-router-dom";
import SessionUserDetails from '../queries/SessionUserDetails.graphql';
import { PopulateSessionContext } from '../utils/HelperMethods';
import ExplorePageStyles from './styles/ExplorePageStyles';

const ExplorePage = ({accessToken}) => {
  const classes = ExplorePageStyles();
  const [userContextSet, setUserContextSet] = useState(false);
  const {sessionContextValue, setSessionContext, clearSessionContext} = useContext(sessionContext);
  const history = useHistory();

  const {data: sessionData} = useQuery(SessionUserDetails, { variables: { input: { accessToken } }});

  useEffect(()=> PopulateSessionContext(sessionData, setSessionContext, setUserContextSet, history), [sessionData]);

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
