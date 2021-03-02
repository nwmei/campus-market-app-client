import React, {useState, useEffect} from "react";
import { Grid } from "@material-ui/core";
import AddCard from "./AddCard";
import {useQuery} from '@apollo/client';
import StoreItems from '../queries/StoreItems.graphql';
import BetaCard from './BetaCard';
import useCardGridStyles from './styles/CardGridStyles';
import {
  useWindowWidth,
} from '@react-hook/window-size';
import FiltersModal from "./FiltersModal";
import {showFilterModal} from "../utils/HelperMethods";
import Loading from './Loading';

const CardGrid = ({updateFilters, clearFilters, setStoreItemsCount, itemsQueryInfo: {page, filters}}) => {
  const classes = useCardGridStyles();
  const innerWidth = useWindowWidth();

  const {data: storeItemsData, refetch} = useQuery(StoreItems, {
    variables: {
      input: {
        page,
        filters
      }
    },
    fetchPolicy: "no-cache"
  });

  useEffect(() => {
    if (storeItemsData) {
      setStoreItemsCount({responded: true, count: storeItemsData.storeItems.length});
    }
  }, [storeItemsData]);

  if (storeItemsData) {
    return (
        <Grid
            container
            spacing={4}
            className={classes.gridContainer}
            alignItems="center"
        >
          <Grid container item xs={12} sm={6} md={4} lg={4} xl={3} align = "center" alignContent="center" alignItems="center">
            {
              showFilterModal(innerWidth) ?
                <>
                  <Grid item xs={6} >
                    <FiltersModal filters={filters} updateFilters={updateFilters} clearFilters={clearFilters}/>
                  </Grid>

                  <Grid item xs={6} >
                    <AddCard refetch={refetch} />
                  </Grid>
                </>
                :
                <>
                  <Grid item xs={12}>
                    <AddCard refetch={refetch} />
                  </Grid>
                </>
            }

          </Grid>
          {
            storeItemsData && storeItemsData.storeItems.map((item, key) =>
                <Grid item xs={12} sm={6} md={4} lg={4} xl={3} align="center" key={-key}>
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
        </Grid>
    );
  } else {
    return <Loading />
  }
};

export default CardGrid;
