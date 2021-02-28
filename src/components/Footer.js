import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import PublicIcon from '@material-ui/icons/Public';
import PersonIcon from '@material-ui/icons/Person';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import useStylesHeader from './styles/HeaderStyles';
import SearchBar from './SearchBar';
import UserIcon from './UserIcon';
import {Link} from "react-router-dom";
import logo from './logo2.png'
import {
  useWindowWidth,
} from '@react-hook/window-size'
import { isMobile } from "../utils/HelperMethods";
import "./styles.css"
import MobileMenu from './MobileMenu'
import Grid from '@material-ui/core/Grid';


const MenuAppBar = ({setLoggedOut}) => {
  const width = useWindowWidth();
  const classes = useStylesHeader();

  return (
      <div className={classes.root}>
        <AppBar position="relative" className={classes.topBar}>
          <Toolbar>
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
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
  );
}

export default MenuAppBar;