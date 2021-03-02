import React from "react";
import "./styles.css";
import { Grid } from "@material-ui/core";
import {useContext, useState} from 'react';
import { sessionContext } from './SessionContext';
import "./styles.css";
import {useQuery} from "@apollo/client";
import MyItemsQuery from "../queries/MyItems.graphql";
import myItemsStyles from "./styles/MyItemsStyles";
import BetaCard from "./BetaCard";
import Filters from "./Filter/Filters";
import FilterPills from "./Filter/FilterPills";
import Divider from "@material-ui/core/Divider";
import PageNavigation from "./PageNavigation";
import Typography from "@material-ui/core/Typography";
import Footer from "../../src/components/Footer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Hidden from "@material-ui/core/Hidden";
import {showFilterModal} from "../utils/HelperMethods";
import {
  useWindowWidth,
} from '@react-hook/window-size';
import FiltersModal from "../../src/components/FiltersModal";

const MyItems = () => {
  const innerWidth = useWindowWidth();
  const [itemsQueryInfo, setItemsQueryInfo] = useState({listedPage: 1, likedPage: 1, filters: []});
  const numberOfFilters = itemsQueryInfo.filters.length;
  const classes = myItemsStyles({numberOfFilters});
  const {sessionContextValue} = useContext(sessionContext);
  const {data: myItemsData, refetch} = useQuery(MyItemsQuery, {
    variables: {
      input: {
        id: sessionContextValue.userId,
        likedPage: itemsQueryInfo.likedPage,
        listedPage: itemsQueryInfo.listedPage,
        filters: itemsQueryInfo.filters
      }
    },
    fetchPolicy: "no-cache"
  });

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
    setItemsQueryInfo({likedPage: 1, listedPage: 1, filters: newActiveFilters})
  };

  const updateListedPageNumber = (newPage = 1) => {
    setItemsQueryInfo({listedPage: newPage, likedPage: itemsQueryInfo.likedPage, filters: itemsQueryInfo.filters});
  };
  const updateLikedPageNumber = (newPage = 1) => {
    setItemsQueryInfo({listedPage: itemsQueryInfo.listedPage, likedPage: newPage, filters: itemsQueryInfo.filters});
  };

  const clearFilters = () => {
    setItemsQueryInfo({listedPage: 1, likedPage: 1, filters: []});
  };

  return (
      <div>
        <div className={classes.root2}>
          <CssBaseline />
          <nav className={classes.drawer} aria-label="mailbox folders">
            <Hidden xsDown implementation="css">
              <Filters filters={itemsQueryInfo.filters} updateFilters={updateFilters} clearFilters={clearFilters} />
            </Hidden>
          </nav>
          <main className={classes.content}>
            <div className={classes.toolbar} />
        <Grid container spacing={3} className={classes.gridContainer} >
          <Grid item xs={12} sm={12} md={12}>
            <FilterPills filters={itemsQueryInfo.filters} updateFilters={updateFilters} />
            <div className={classes.divider}>
              <Divider />
            </div>
            <Grid container spacing={4} className={classes.subcontainer}>
              {
                showFilterModal(innerWidth) &&
                <Grid item xs={6} >
                  <FiltersModal filters={itemsQueryInfo.filters} updateFilters={updateFilters} clearFilters={clearFilters}/>
                </Grid>
              }
              {
                myItemsData &&
                <Grid item xs={12}>
                  <Typography variant="h2">Listed by you</Typography>
                </Grid>
              }
              {
                myItemsData && myItemsData.myItems.listedByMe.map((item, key) =>
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={-key}>
                    <BetaCard
                      enterable={true}
                      date={new Date(parseInt(item.date))}
                      daysAgo={(Date.now() - parseInt(item.date))/86400000}
                      key={-key}
                      itemId={item.id}
                      itemName={item.name}
                      description={item.description}
                      price={item.price}
                      seller={item.seller}
                      likes={item.likes}
                      imageUrls={item.imageUrls}
                      category={item.category}
                      neighborhood={item.neighborhood}
                      refetch={refetch}
                    />
                  </Grid>
                )
              }
              {
                myItemsData && myItemsData.myItems &&
                <Grid item xs={12}>
                  <PageNavigation
                    storeItemsCount={myItemsData.myItems.listedByMe.length}
                    component="myItems"
                    backOnClick={() => updateListedPageNumber(itemsQueryInfo.listedPage-1)}
                    nextOnClick={() => updateListedPageNumber(itemsQueryInfo.listedPage+1)}
                    pageNumber={itemsQueryInfo.listedPage}
                  />
                </Grid>
              }
              {
                myItemsData &&
                <Grid item xs={12}>
                  <Typography variant="h2">Liked by you</Typography>
                </Grid>
              }
              {
                myItemsData && myItemsData.myItems.likedByMe.map((item, key) =>
                  <Grid item xs={12} sm={6} md={4} lg={3} key={-key}>
                    <BetaCard
                      enterable={true}
                      date={new Date(parseInt(item.date))}
                      daysAgo={(Date.now() - parseInt(item.date))/86400000}
                      key={-key}
                      itemId={item.id}
                      itemName={item.name}
                      description={item.description}
                      price={item.price}
                      seller={item.seller}
                      likes={item.likes}
                      imageUrls={item.imageUrls}
                      category={item.category}
                      neighborhood={item.neighborhood}
                      refetch={refetch}
                    />
                  </Grid>
                )
              }
              {
                myItemsData && myItemsData.myItems &&
                <Grid item xs={12}>
                  <PageNavigation
                    storeItemsCount={myItemsData.myItems.likedByMe.length}
                    component="myItems"
                    backOnClick={() => updateLikedPageNumber(itemsQueryInfo.likedPage-1)}
                    nextOnClick={() => updateLikedPageNumber(itemsQueryInfo.likedPage+1)}
                    pageNumber={itemsQueryInfo.likedPage}
                  />
                </Grid>
              }
            </Grid>
          </Grid>
        </Grid>
          </main>
        </div>
        <Footer />
      </div>
  )

}

export default MyItems;
