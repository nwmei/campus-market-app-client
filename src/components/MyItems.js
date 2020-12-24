import React from "react";
import "./styles.css";
import { Grid } from "@material-ui/core";
import {useContext, useEffect, useState} from 'react';
import { sessionContext } from './SessionContext';
import "./styles.css";
import {useQuery} from "@apollo/client";
import { useHistory } from "react-router-dom";
import SessionUserDetails from "../queries/SessionUserDetails.graphql";
import MyItemsQuery from "../queries/MyItems.graphql";
import { PopulateSessionContext } from '../utils/HelperMethods';
import myItemsStyles from "./styles/MyItemsStyles";
import Button from "./controls/Button";
import BetaCard from "./BetaCard";
import Filters from "./Filter/Filters";

const MyItems = ({accessToken}) => {
  const classes = myItemsStyles();
  const [helperFunctionDone, setHelperFunctionDone] = useState(false);
  const [userContextSet, setUserContextSet] = useState(false);
  const [myItems, setMyItems] = useState({likedByMe: [], listedByMe: []});
  const {sessionContextValue, setSessionContext, clearSessionContext} = useContext(sessionContext);
  const history = useHistory();

  const {data: sessionData, loading} = useQuery(SessionUserDetails, { variables: { input: { accessToken } }});
  const {data: myItemsData} = useQuery(MyItemsQuery, { variables: { input: {id: sessionContextValue.userId}}});

  useEffect(()=> PopulateSessionContext(sessionData, setSessionContext, setUserContextSet, history, setHelperFunctionDone), [sessionData]);

  useEffect(() => {
    if (myItemsData) {
      setMyItems(myItemsData.myItems);
    }
  }, [myItemsData]);

  if (loading || !helperFunctionDone) {
    return <></>
  } else if (userContextSet) {
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
  } else {
    return (
        <div>
          <p>You can't access this without logging in!</p>
          <Button text="go to login page" onClick={() => history.push("/login")} color="inherit"/>
        </div>
    )
  }

}

export default MyItems;
