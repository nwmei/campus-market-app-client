import React from "react";
import "./styles.css";
import {useContext} from 'react';
import { sessionContext } from './SessionContext';
import "./styles.css";
import aboutPageStyles from "./styles/AboutPageStyles";

const About = () => {
  const classes = aboutPageStyles();
  const {sessionContextValue} = useContext(sessionContext);

  return (
    <div>
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
