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
        <img src="https://scontent-bos3-1.xx.fbcdn.net/v/t1.15752-0/p180x540/143391269_1056836224784805_624806943422915111_n.jpg?_nc_cat=109&ccb=2&_nc_sid=f79d6e&_nc_ohc=lL-pv-UnxRQAX-Czklf&_nc_ht=scontent-bos3-1.xx&tp=6&oh=70e9505923b688afbf5e24d13e5007e5&oe=603502BB"/>
      </div>
    </div>
  )
};

export default About;
