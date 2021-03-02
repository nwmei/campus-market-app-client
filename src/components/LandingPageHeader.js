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
import logo from './logo3.png' //aileron regular 34.5 font
import {
  useWindowWidth,
} from '@react-hook/window-size'
import { isMobile } from "../utils/HelperMethods";
import "./styles.css"
import MobileMenu from './MobileMenu'
import {makeStyles} from "@material-ui/core/styles";
import {gradientColor} from "../../src/components/constants";

const LandingPageHeader = () => {
  const width = useWindowWidth();
  const classes = useStylesHeader();
  const isMobileView = isMobile(width);

  return (
    isMobileView
      ?
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.topBar}>
          <Toolbar>
              <img src={logo} className={classes.mobilePhoto}/>
          </Toolbar>
        </AppBar>
      </div>
      :
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.topBar}>
          <Toolbar>
            <Link to="/explore">
              <img src={logo} className={classes.photo}/>
            </Link>

          </Toolbar>
        </AppBar>
      </div>
  );
}

export default LandingPageHeader;