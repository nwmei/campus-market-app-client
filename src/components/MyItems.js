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

const MyItems = () => {
  const [filters, setFilters] = useState([]);
  const numberOfFilters = filters.length;
  const classes = myItemsStyles({numberOfFilters});
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
          <Filters setFilters={setFilters}/>
        </Grid>
        <Grid item xs={12} sm={10}>
          <FilterPills filters={filters}/>
          <div className={classes.divider}>
            <Divider />
          </div>
          <Grid container spacing={4} className={classes.subcontainer}>
            <Grid item xs={12}>
              MY ITEMS
            </Grid>
            <Grid item xs={12}>
              ITEMS YOU'VE LISTED
            </Grid>
            {
              myItems.listedByMe.map((item, key) =>
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
                  />
                </Grid>
              )
            }
            <Grid item xs={12}>
              ITEMS YOU'VE LIKED:
            </Grid>
            {
              myItems.likedByMe.map((item, key) =>
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
