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

const MyItems = () => {
  const classes = myItemsStyles();
  const [myItems, setMyItems] = useState({likedByMe: [], listedByMe: []});
  const {sessionContextValue} = useContext(sessionContext);
  const {data: myItemsData} = useQuery(MyItemsQuery, { variables: { input: {id: sessionContextValue.userId}}});

  useEffect(() => {
    if (myItemsData) {
      setMyItems(myItemsData.myItems);
    }
  }, [myItemsData]);

  return (
    <div>
      <Grid container spacing={3} className={classes.gridContainer} >
        <Grid item xs={12} sm={2} style={{marginBottom: 80}}>
          <Filters />
        </Grid>
        <Grid item xs={12} sm={10}>
          <Grid container
                spacing={4}
          >
            <Grid item xs={12}>
              MY ITEMS
            </Grid>
            <Grid item xs={12}>
              ITEMS YOU'VE LISTED
            </Grid>
            {
              myItems.listedByMe.map((item, key) =>
                <Grid item xs={12} sm={6} md={4} key={-key}>
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
                  />
                </Grid>
              )
            }
            <Grid item xs={12}>
              ITEMS YOU'VE LIKED:
            </Grid>
            {
              myItems.likedByMe.map((item, key) =>
                <Grid item xs={12} sm={6} md={4} key={-key}>
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
                  />
                </Grid>
              )
            }
          </Grid>
        </Grid>
      </Grid>
    </div>
  )

}

export default MyItems;
