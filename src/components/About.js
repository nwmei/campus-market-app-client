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
          About campusmarketapp.com
        </h1>
        <h2>
          A message from the Founder and CEO:
        </h2>
        <p>
          Our goal is to give you the power to buy and sell things with a frictionless experience. If you have questions
          or suggestions, please email nelsonm3904@gmail.com (he is the founder, ceo, PO, director of marketing,
          principal software engineer, and scrum master all in one).
        </p>
      </div>
    </div>
  )
};

export default About;
