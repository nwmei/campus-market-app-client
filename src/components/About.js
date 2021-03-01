import React from "react";
import "./styles.css";
import {useContext} from 'react';
import { sessionContext } from './SessionContext';
import "./styles.css";
import aboutPageStyles from "./styles/AboutPageStyles";
import Footer from "../../src/components/Footer";
import Typography from "@material-ui/core/Typography";

const About = () => {
  const classes = aboutPageStyles();
  const {sessionContextValue} = useContext(sessionContext);

  return (
    <div>
      <div className={classes.gridContainer}>
        <Typography variant='h2' >
          Hi {sessionContextValue.userFirstName},
        </Typography>
        <Typography variant='h4' >
          A little about campusmarketapp.com with a message from our Founder:
        </Typography>
        <Typography variant='subtitle1'>
          We all could benefit from saving some money, and the last thing you need is interference from middle-man service fees.
          Our goal is to give you the power to buy and sell used items with a very friction-free experience. If you have questions
          or suggestions, my email is nelsonm3904@gmail.com.
        </Typography>
        <img className='hamburger' src="https://images-na.ssl-images-amazon.com/images/I/711Ng9GLyZL._AC_SL1500_.jpg"/>
      </div>
      <Footer />
    </div>
  )
};

export default About;
