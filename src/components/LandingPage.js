import { useHistory } from 'react-router-dom';
import LoginButton from './LoginButton';
import { makeStyles, fade } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Grid, } from '@material-ui/core';
import React from "react";
import logo from './logo3.png'
import {
  useWindowWidth,
} from '@react-hook/window-size';
import Box from '@material-ui/core/Box';
import MockCard from './mockCard';
import {showFilterModal} from "../utils/HelperMethods";
import appScreenshot from './appScreenshot2.png'
import Footer from './Footer'
import {mockCardData} from "./mocks";

const useStyles = makeStyles((props) => ({
  r: {
    backgroundSize: 'cover',
    backgroundImage: 'linear-gradient(#CFE6FF, #90C6FF)'
    // backgroundColor: '#90C6FF',
    // backgroundImage: `url(https://climatereadycommunities.org/wp-content/uploads/2017/11/home-slide-community-illustration.jpg.jpg) repeat fixed /300px`,
  },
  root: props => ({
    paddingBottom: 0,
    minHeight: '100vh',
    backgroundRepeat: 'no-repeat',
    marginLeft: props.mobile ? 20 : 60,
    marginRight: props.mobile ? 20 : 10
  }),
  centerText: {
    display: 'flex',
    // height: '100vh',
    fontFamily: 'Nunito',
    fontSize: 12,
    color: '#000000'
  },
  body1: props => ({
    marginTop: 90,
    paddingRight: props.mobile? 0 : 0
  }),
  body2: props => ({
    marginTop: props.mobile ? 20 : 90,
  }),
  body3: props => ({
    marginTop: props.mobile ? 10 : 50
  }),
  google: {
    paddingTop: 10,
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0
  },
  subHeader: {
    marginTop: 30,
    marginRight: 10,
    marginBottom: 10
  },
  mock: {
    marginTop: 10
  },
  appScreenshot: props => ({
    height: props.mobile? 250 : 460,
    width: props.mobile? '100%' : 640
  })
}));

const LandingPage = ({ setLoggedIn }) => {
  const innerWidth = useWindowWidth();
  const mobile = showFilterModal(innerWidth);
  const classes = useStyles({mobile});
  const history = useHistory();

  const navigateToExplorePage = () => {
    setLoggedIn(true);
    history.push('/explore');
  };
  return (
    <div className={classes.r}>
    <div className={classes.root}>
      <CssBaseline />
      <div className={classes.centerText}>
        <Grid container alignItems="center">
          <Grid xs={12} sm={6} item container className={classes.body1}>
            <Typography variant={mobile ? "h4" : "h3"} >
              <Box fontWeight="fontWeightBold" m={1} fontFamily='sans-serif'>
                Save money. Browse and sell used items on your campus.
              </Box>
            </Typography>
            <Typography variant={innerWidth < 510 ? 'h5' : 'h4'} className={classes.subHeader}>
              <Box m={1} fontWeight="fontWeightLight" fontFamily='sans-serif'>
                Filter items by campus, dorm, and category! Books, furniture, food, and more!
              </Box>
            </Typography>
            <Grid xs={12} item align="center" className={classes.google}>
              <LoginButton loginProvider='google' navigateAfterLogin={navigateToExplorePage} />
            </Grid>
            <Grid xs={12} item align="center" className={classes.google}>
              <LoginButton loginProvider='microsoft' navigateAfterLogin={navigateToExplorePage} />
            </Grid>
            <Grid xs={12} item align="center">
              <Typography variant="caption">with your .edu email for optimal experience!</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={5} className={classes.body2}>
            <img src={appScreenshot} className={classes.appScreenshot}/>
          </Grid>
          <Grid item xs={12} sm={6} md={4} className={classes.body3} align = "center" >
            <MockCard {...mockCardData[0]} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} className={classes.body3} align = "center">
            <MockCard {...mockCardData[1]} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} className={classes.body3} align = "center">
            <MockCard {...mockCardData[2]} expand/>
          </Grid>
        </Grid>
      </div>
    </div>
    <Footer waitToRender={false} />
      </div>
  )
};

export default LandingPage;