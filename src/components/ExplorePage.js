import ExploreCardGrid from './CardGrid';
import Grid from '@material-ui/core/Grid';
import Filters from './Filter/Filters';
import React, {useContext, useEffect, useState} from 'react';
import ExplorePageStyles from './styles/ExplorePageStyles';
import Divider from '@material-ui/core/Divider';
import FilterPills from "./Filter/FilterPills";
import PageNavigation from "./PageNavigation";
import Alert from '@material-ui/lab/Alert';
import {sessionContext} from "./SessionContext";
import NonSchoolAlert from "../../src/components/NonSchoolAlert";
import {
  useWindowWidth,
} from '@react-hook/window-size'
import FilterDrawer from './FilterDrawer';
import AddItemForm from "../../src/components/AddItemForm";
import Popup from "../../src/components/Popup";

const ExplorePage = () => {
  const innerWidth = useWindowWidth();
  const [itemsQueryInfo, setItemsQueryInfo] = useState({page: 1, filters: []});
  const [storeItemsCount, setStoreItemsCount] = useState({responded: false, count: 0});
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const numberOfFilters = itemsQueryInfo.filters.length;
  const classes = ExplorePageStyles({numberOfFilters});
  const {sessionContextValue} = useContext(sessionContext);

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
        <FilterDrawer filters={itemsQueryInfo.filters} updateFilters={updateFilters} clearFilters={clearFilters}>
          <Grid container spacing={3} className={classes.root}>
            <Grid className={classes.main} item xs={12} sm={12} md={12}>
              <FilterPills filters={itemsQueryInfo.filters} updateFilters={updateFilters}/>
              <div className={classes.divider}>
                <Divider />
                {
                  sessionStorage.getItem('showedNonSchoolMessage') !== 'true' && sessionContextValue.school === 'Off-Campus' &&
                  <NonSchoolAlert />
                }
              </div>
              <ExploreCardGrid updateFilters={updateFilters} clearFilters={clearFilters} setStoreItemsCount={setStoreItemsCount} itemsQueryInfo={itemsQueryInfo} />
              {
                storeItemsCount.responded &&
                <PageNavigation
                  storeItemsCount={storeItemsCount.count}
                  component="explore"
                  backOnClick={() => {
                    window.scrollTo( 0, 0)
                    updatePageNumber(itemsQueryInfo.page-1);
                  }}
                  nextOnClick={() => {
                    window.scrollTo( 0, 0)
                    updatePageNumber(itemsQueryInfo.page+1);
                  }}
                  pageNumber={itemsQueryInfo.page}
                />
              }
            </Grid>
          </Grid>
        </FilterDrawer>
      </div>
    )
};

export default ExplorePage;
