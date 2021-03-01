import React, {useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useStylesHeader from './styles/HeaderStyles';
import "./styles.css"
import Grid from '@material-ui/core/Grid';
import set from "@babel/runtime/helpers/esm/set";

const Footer = ({waitToRender=true}) => {
  const classes = useStylesHeader();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (waitToRender) {
      setTimeout(() => {
        setShow(true)
      }, 500)
    } else {
      setShow(true)
    }
  });

  return (
    show &&
      <div className='footer'>
        <AppBar position="relative" className={classes.topBar}>
          <Toolbar className='black'>
            <Grid container >
              <Grid item xs={12} sm={6} md={3} >
                <div>
                  About us
                </div>
                <div>
                  Who we are
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={3} >
                The latest
              </Grid>
              <Grid item xs={12} sm={6} md={3} >
                <div>
                  Connect
                </div>
                <div>
                  Instagram
                </div>
                <div>
                  Twitter
                </div>
                <div>
                  LinkedIn
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={3} >
                <div>
                  Careers
                </div>
                <div>
                  Open positions
                </div>
                <div>
                  Why join us?
                </div>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
  );
};

export default Footer;