import { useHistory } from 'react-router-dom';
import LoginButton from './LoginButton';
import { makeStyles, fade } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Grid, } from '@material-ui/core';
import React from "react";
import logo from './logo2.png'
import {
  useWindowWidth,
} from '@react-hook/window-size';
import SessionContextProvider from "./SessionContext";
import {ApolloProvider} from "@apollo/client";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: 430,
    minHeight: '100vh',
    backgroundImage: `url(https://climatereadycommunities.org/wp-content/uploads/2017/11/home-slide-community-illustration.jpg.jpg)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  centerText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontFamily: 'Nunito',
    fontSize: 12,
    color: '#000000'
  },
  google: {
    marginBottom: 10
  }
}));

const LandingPage = ({ setLoggedIn }) => {
  const innerWidth = useWindowWidth();
  const classes = useStyles();
  const history = useHistory();

  const navigateToExplorePage = () => {
    setLoggedIn(true);
    history.push('/explore');
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <div className={classes.centerText}>
        <Grid container alignItems="center">
          <Grid xs={12} item align="center">
            <Typography variant="h4">The place to browse and sell used items</Typography>
          </Grid>
          <Grid xs={12} item align="center">
            <img src={logo} className={innerWidth < 480 ? 'LandingPhotoMobile' : 'LandingPhoto'}/>
          </Grid>
          <Grid xs={12} item align="center" className={classes.google}>
            <LoginButton loginProvider='google' navigateAfterLogin={navigateToExplorePage} />
          </Grid>
          <Grid xs={12} item align="center">
            <LoginButton loginProvider='microsoft' navigateAfterLogin={navigateToExplorePage} />
          </Grid>
          <Grid xs={12} item align="center">
            <Typography variant="caption">with your .edu email for optimal experience!</Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  )
};

export default LandingPage;