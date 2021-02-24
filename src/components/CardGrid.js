import React, {useState, useEffect} from "react";
import { Grid } from "@material-ui/core";
import AddCard from "./AddCard";
import {useQuery} from '@apollo/client';
import StoreItems from '../queries/StoreItems.graphql';
import BetaCard from './BetaCard';
import useCardGridStyles from './styles/CardGridStyles';

const CardGrid = ({setStoreItemsCount, itemsQueryInfo: {page, filters}}) => {
  const classes = useCardGridStyles();

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
          <Grid item xs={12} sm={12} md={6} lg={4} align="center">
            <AddCard refetch={refetch} />
          </Grid>
          {
            storeItemsData && storeItemsData.storeItems.map((item, key) =>
                <Grid item xs={12} sm={12} md={6} lg={4} align="center" key={-key}>
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
    return <></>;
  }
}

export default CardGrid;
