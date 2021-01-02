import CardGrid from './CardGrid';
import Grid from '@material-ui/core/Grid';
import Filters from './Filter/Filters';
import React, {useState} from 'react';
import ExplorePageStyles from './styles/ExplorePageStyles';
import Divider from '@material-ui/core/Divider';
import FilterPills from "./Filter/FilterPills";
import Button from "./controls/Button"
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const ExplorePage = () => {
  const [itemsQueryInfo, setItemsQueryInfo] = useState({page: 1, filters: []});
  const numberOfFilters = itemsQueryInfo.filters.length;
  const classes = ExplorePageStyles({numberOfFilters});

  const updateFilters = (oldFilter, newFilter) => {
    const newActiveFilters = itemsQueryInfo.filters.filter(activeFilter => {
      return activeFilter.value !== oldFilter.value
    });
    if (oldFilter.value !== newFilter.value) {
      if(typeof newFilter.value === String) {
        newFilter.value = [newFilter.value]
      }
      newActiveFilters.push(newFilter);
    }
    setItemsQueryInfo({page: 1, filters: newActiveFilters})
  };

  const updatePageNumber = (newPage = 1) => {
    setItemsQueryInfo({page: newPage, filters: itemsQueryInfo.filters});
  };

  const clearFilters = () => {
    setItemsQueryInfo({page: 1, filters: []});
  };

    return (
        <div>
          <Grid container spacing={3} className={classes.root}>
            <Grid item xs={12} sm={2} style={{marginBottom: 80}}>
              <Filters filters={itemsQueryInfo.filters} updateFilters={updateFilters} clearFilters={() => clearFilters()}/>
            </Grid>
            <Grid item xs={12} sm={10}>
              <FilterPills filters={itemsQueryInfo.filters} updateFilters={updateFilters}/>
              <div className={classes.divider}>
                <Divider />
              </div>
              <CardGrid itemsQueryInfo={itemsQueryInfo} />
              <div className={classes.pageNavigation} >
                <Button text="<" onClick={() => updatePageNumber(itemsQueryInfo.page-1)} disabled={itemsQueryInfo.page===1}/>
                {itemsQueryInfo.page}
                <Button text=">" onClick={() => updatePageNumber(itemsQueryInfo.page+1)}/>

              </div>
            </Grid>
          </Grid>
        </div>
    )
};

export default ExplorePage;
