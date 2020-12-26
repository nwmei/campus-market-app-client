import CardGrid from './CardGrid';
import Grid from '@material-ui/core/Grid';
import Filters from './Filter/Filters';
import React, {useState} from 'react';
import ExplorePageStyles from './styles/ExplorePageStyles';
import Divider from '@material-ui/core/Divider';
import FilterPills from "./Filter/FilterPills";

const ExplorePage = () => {
  const [filters, setFilters] = useState([]);
  const numberOfFilters = filters.length;
  const classes = ExplorePageStyles({numberOfFilters});

  const updateFilters = (oldFilter, newFilter) => {
    const newActiveFilters = filters.filter(activeFilter => {
      return activeFilter.value !== oldFilter.value
    });
    if (oldFilter.value !== newFilter.value) {
      newActiveFilters.push(newFilter);
    }
    setFilters(newActiveFilters)
  };

    return (
        <div>
          <Grid container spacing={3} className={classes.root}>
            <Grid item xs={12} sm={2} style={{marginBottom: 80}}>
              <Filters filters={filters} updateFilters={updateFilters}/>
            </Grid>
            <Grid item xs={12} sm={10}>
              <FilterPills filters={filters} updateFilters={updateFilters}/>
              <div className={classes.divider}>
                <Divider />
              </div>
              <CardGrid filters={filters}/>
            </Grid>
          </Grid>
        </div>
    )
};

export default ExplorePage;
