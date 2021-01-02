import React from "react";
import "./styles.css";
import { Grid } from "@material-ui/core";
import {useContext, useEffect, useState} from 'react';
import { sessionContext } from './SessionContext';
import "./styles.css";
import {useQuery} from "@apollo/client";
import MyItemsQuery from "../queries/MyItems.graphql";
import myItemsStyles from "./styles/MyItemsStyles";
import BetaCard from "./BetaCard";
import Filters from "./Filter/Filters";
import FilterPills from "./Filter/FilterPills";
import Divider from "@material-ui/core/Divider";
import Button from "./controls/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const MyItems = () => {
  const [itemsQueryInfo, setItemsQueryInfo] = useState({listedPage: 1, likedPage: 1, filters: []});
  const numberOfFilters = itemsQueryInfo.filters.length;
  const classes = myItemsStyles({numberOfFilters});
  const {sessionContextValue} = useContext(sessionContext);
  const {data: myItemsData} = useQuery(MyItemsQuery, {
    variables: {
      input: {
        id: sessionContextValue.userId,
        likedPage: itemsQueryInfo.likedPage,
        listedPage: itemsQueryInfo.listedPage,
        filters: itemsQueryInfo.filters
      }
    }
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
      <Grid container spacing={3} className={classes.gridContainer} >
        <Grid item xs={12} sm={2} style={{marginBottom: 80}}>
          <Filters filters={itemsQueryInfo.filters} updateFilters={updateFilters} clearFilters={clearFilters}/>
        </Grid>
        <Grid item xs={12} sm={10}>
          <FilterPills filters={itemsQueryInfo.filters} updateFilters={updateFilters} />
          <div className={classes.divider}>
            <Divider />
          </div>
          <Grid container spacing={4} className={classes.subcontainer}>
            <Grid item xs={12}>
              ITEMS YOU'VE LISTED
            </Grid>
            {
              myItemsData && myItemsData.myItems.listedByMe.map((item, key) =>
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
                    imageUrl={item.imageUrl}
                    category={item.category}
                    neighborhood={item.neighborhood}
                  />
                </Grid>
              )
            }
            <Grid item xs={12}>
              <div className={classes.pageNavigation} >
                <Button text="back" startIcon={<ArrowBackIosIcon />} onClick={() => updateListedPageNumber(itemsQueryInfo.listedPage-1)} disabled={itemsQueryInfo.listedPage===1}/>
                <h4>page {itemsQueryInfo.listedPage} </h4>
                <Button text="next" startIcon={<ArrowForwardIosIcon />} onClick={() => updateListedPageNumber(itemsQueryInfo.listedPage+1)}/>
              </div>
            </Grid>
            <Grid item xs={12}>
              ITEMS YOU'VE LIKED:
            </Grid>
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
                    imageUrl={item.imageUrl}
                    category={item.category}
                    neighborhood={item.neighborhood}
                  />
                </Grid>
              )
            }
            <Grid item xs={12}>
              <div className={classes.pageNavigation} >
                <Button text="back" startIcon={<ArrowBackIosIcon />} onClick={() => updateLikedPageNumber(itemsQueryInfo.likedPage-1)} disabled={itemsQueryInfo.likedPage===1}/>
                <h4>page {itemsQueryInfo.likedPage} </h4>
                <Button text="next" startIcon={<ArrowForwardIosIcon />} onClick={() => updateLikedPageNumber(itemsQueryInfo.likedPage+1)}/>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )

}

export default MyItems;
