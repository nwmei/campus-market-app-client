import React from "react";
import "./styles.css";
import { makeStyles } from "@material-ui/core/styles";
import {useContext, useEffect, useState} from 'react';
import { sessionContext } from './SessionContext';
import "./styles.css";
import Header from './Header';
import {useQuery} from "@apollo/client";
import { useHistory } from "react-router-dom";
import SessionUserDetails from "../queries/SessionUserDetails.graphql";
import { PopulateSessionContext } from '../utils/HelperMethods';
import aboutPageStyles from "./styles/AboutPageStyles";

const About = () => {
  const accessToken = localStorage.getItem('accessToken');
  const classes = aboutPageStyles();
  const [userContextSet, setUserContextSet] = useState(false);
  const {sessionContextValue, setSessionContext, clearSessionContext} = useContext(sessionContext);
  const history = useHistory();

  const {data: sessionData} = useQuery(SessionUserDetails, { variables: { input: { accessToken } }});

  useEffect(()=> PopulateSessionContext(sessionData, setSessionContext, setUserContextSet, history), [sessionData]);

  return(
    <div>
      <Header />
      <div className={classes.gridContainer}>
        <h1>
          Hi {sessionContextValue.userFirstName},
        </h1>
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