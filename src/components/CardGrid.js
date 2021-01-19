import React, {useState, useEffect} from "react";
import { Grid } from "@material-ui/core";
import AddCard from "./AddCard";
import {useQuery} from '@apollo/client';
import StoreItems from '../queries/StoreItems.graphql';
import BetaCard from './BetaCard';
import useCardGridStyles from './styles/CardGridStyles';

const CardGrid = ({itemsQueryInfo: {page, filters}}) => {
  const classes = useCardGridStyles();
  const [itemsAdded, setItemsAdded] = useState(0);

  const {data: storeItemsData} = useQuery(StoreItems, {
    variables: {
      input: {
        page,
        filters
      }
    },
    fetchPolicy: "no-cache"
  });

  const incrementItemsAdded = () => {
    setItemsAdded(itemsAdded + 1);
  };

  if (storeItemsData) {
    return (
        <Grid
            container
            spacing={4}
            className={classes.gridContainer}
            alignItems="center"
        >
          <Grid item xs={12} sm={6} md={4} lg={4} align="center">
            <AddCard incrementItemsAdded={incrementItemsAdded} />
          </Grid>
          {
            storeItemsData && storeItemsData.storeItems.map((item, key) =>
                <Grid item xs={12} sm={6} md={4} lg={4} key={-key}>
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
        </Grid>
    );
  } else {
    return <></>;
  }
}

export default CardGrid;
