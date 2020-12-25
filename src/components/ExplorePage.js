import { useQuery} from "@apollo/client";
import CardGrid from './CardGrid';
import Grid from '@material-ui/core/Grid';
import Filters from './Filter/Filters';
import React, {useContext, useEffect, useState} from 'react';
import { sessionContext } from './SessionContext';
import { useHistory } from "react-router-dom";
import SessionUserDetails from '../queries/SessionUserDetails.graphql';
import { PopulateSessionContext } from '../utils/HelperMethods';
import ExplorePageStyles from './styles/ExplorePageStyles';
import { Redirect } from 'react-router'
import Divider from '@material-ui/core/Divider';
import FilterPills from "./Filter/FilterPills";

const ExplorePage = ({accessToken}) => {
  const [helperFunctionDone, setHelperFunctionDone] = useState(false);
  const [userContextSet, setUserContextSet] = useState(false);
  const [filters, setFilters] = useState([]);
  const numberOfFilters = filters.length;
  const {sessionContextValue, setSessionContext, clearSessionContext} = useContext(sessionContext);
  const history = useHistory();
  const classes = ExplorePageStyles({numberOfFilters});

    return (
        <div>
          <Grid container spacing={3} className={classes.root}>
            <Grid item xs={12} sm={2} style={{marginBottom: 80}}>
              <Filters setFilters={setFilters}/>
            </Grid>
            <Grid item xs={12} sm={10}>
              <FilterPills filters={filters}/>
              <div className={classes.divider}>
                <Divider />
              </div>
              <CardGrid />
            </Grid>
          </Grid>
        </div>
    )
};

export default ExplorePage;
