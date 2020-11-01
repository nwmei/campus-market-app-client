import React, {useState, useEffect} from "react";
import c from "./styles.css";
import MyCard from "./Card";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddCard from "./AddCard";
import { useQuery } from '@apollo/client';
import StoreItems from '../queries/StoreItems.graphql';
import BetaCard from './BetaCard';

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
    paddingTop: "40px"
  }
});

export default function CardGrid() {
  const classes = useStyles();
  const [itemsAdded, setItemsAdded] = useState(0);

  const {data: storeItemsData} = useQuery(StoreItems, {
    // apollo needs a variable to call query again
    variables: {
      input: itemsAdded
    }
  });



  const incrementItemsAdded = () => {
    setItemsAdded(itemsAdded + 1);
  }

  return (
    <Grid
      container
      spacing={4}
      className={classes.gridContainer}
      justify="center"
    >
      <Grid item xs={12} sm={6} md={4}>
        <AddCard incrementItemsAdded={incrementItemsAdded} />
      </Grid>
      { 
        storeItemsData && storeItemsData.storeItems.slice(0).reverse().map((item, key) => 
          <Grid item xs={12} sm={6} md={4} key={-key}>
            <BetaCard 
              key={-key} 
              itemName={item.name} 
              description={item.description} 
              price={item.price} 
              seller={item.seller} 
              imageUrl={item.imageUrl} />
          </Grid>
        )
      }
    </Grid>
  );
}
