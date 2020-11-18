import React from "react";
import "./styles.css";
import MyCard from "./BetaCard";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {useContext, useEffect, useState} from 'react';
import { sessionContext } from './SessionContext';
import "./styles.css";
import Header from './Header';
import {useQuery} from "@apollo/client";
import { useHistory, Redirect } from "react-router-dom";
import SessionUserDetails from "../queries/SessionUserDetails.graphql";

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
    paddingTop:"70px", 
  }
});

const About = () => {
  const classes = useStyles();
  const [userContextSet, setUserContextSet] = useState(false);
  const {sessionContextValue, setSessionContext, clearSessionContext} = useContext(sessionContext);
  const history = useHistory();

  const {data: sessionData} = useQuery(SessionUserDetails, {
    variables: {
      input: {
        accessToken: localStorage.getItem('accessToken')
      }
    }
  });

  useEffect(()=> {
    if (sessionData) {
      if (sessionData.sessionUserDetails != null) {
        const {id, firstName, lastName, emailAddress, imageUrl} = sessionData.sessionUserDetails;
        setSessionContext(firstName, lastName, emailAddress, imageUrl, id);
        setUserContextSet(true);
      } else {
        history.push('/login')
      }
    }
  }, [sessionData]);

  return(
    <div>
      <Header />
      <div className={classes.gridContainer}>
        <h1>
          About Smarter Trade App
        </h1>
        <h2>
          A message from the Founder and CEO:
        </h2>
        <p>
          A message from the Founder and CEO:
          Our goal is to give you the power to buy and sell things with a frictionless experience
        </p>
      </div>
    </div>
  )
};

export default About;