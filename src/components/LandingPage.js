import { useHistory } from 'react-router-dom';
import LoginButton from './LoginButton';
import { makeStyles, fade } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Grid, } from '@material-ui/core';
import React from "react";
import logo from './logo2.png'


const useStyles = makeStyles((theme) => ({
  button: {
    paddingTop: "80px"
  },
  root: {
    minHeight: '100vh',
    //backgroundImage: `url(https://i.pinimg.com/originals/47/b0/fc/47b0fc72de8473487d5e1d4df4a83518.jpg)`,
    backgroundImage: `url(https://videohive.img.customer.envatousercontent.com/files/f79d2e3c-74ce-41d3-bd6f-abd591e8fd06/inline_image_preview.jpg?auto=compress%2Cformat&fit=crop&crop=top&max-h=8000&max-w=590&s=2c2bc3750b9267afd2ce33384acd3bf7)`,
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

const LandingPage = ({ setSessionQueryResponded }) => {
  const classes = useStyles();
  const history = useHistory();

  const navigateToExplorePage = () => {
    setSessionQueryResponded(false);
    history.push('/explore');
  };
  return (
    // <div className={classes.button}>
    //   <h1>Welcome to campusmarketapp.com! Please log in.</h1>
    //   <GoogleLogin navigateAfterLogin={navigateToExplorePage} />
    // </div>


    <div className={classes.root}>
      <CssBaseline />
      <div className={classes.centerText}>
        <Grid container alignItems="center">
          <Grid xs={12} item align="center">
            <Typography variant="h2">Welcome to </Typography>
          </Grid>
          <Grid xs={12} item align="center">
            <img src={logo} className="LandingPhoto"/>
          </Grid>
          <Grid xs={12} item align="center" className={classes.google}>
            <LoginButton loginProvider='google' navigateAfterLogin={navigateToExplorePage} />
          </Grid>
          <Grid xs={12} item align="center">
            <LoginButton loginProvider='microsoft' navigateAfterLogin={navigateToExplorePage} />
          </Grid>
          <Grid xs={12} item align="center">
            <Typography variant="caption">Website created by Nelson Mei</Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  )
};

export default LandingPage;